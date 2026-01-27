import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Brackets, EntityManager, Repository } from 'typeorm';

import { TransactionalService } from '@libs/core/database';

import { OutboxEventType, OutboxStatus } from './enums';
import { OutboxEntity } from './outbox.entity';

@Injectable()
export class OutboxService extends TransactionalService<OutboxEntity> {
  constructor(
    @InjectRepository(OutboxEntity)
    outboxRepository: Repository<OutboxEntity>,
  ) {
    super(outboxRepository);
  }

  async enqueue(eventType: OutboxEventType, payload: unknown, em?: EntityManager) {
    return this.getRepository(em).save({
      eventType,
      payload,
      status: OutboxStatus.PENDING,
      attempts: 0,
      lockedBy: null,
      lockedUntil: null,
      lastError: null,
      lastAttemptAt: null,
    });
  }

  async findByDispatchTargets(size = 100, em?: EntityManager) {
    const repository = this.getRepository(em);

    const rowsByPending = await repository
      .createQueryBuilder('o')
      .setLock('pessimistic_write')
      .setOnLocked('skip_locked')
      .where('o.status = :pending', { pending: OutboxStatus.PENDING })
      .orderBy('o.createdAt', 'ASC')
      .limit(size)
      .getMany();

    const rowsByExpiredProcessing = await repository
      .createQueryBuilder('o')
      .setLock('pessimistic_write')
      .setOnLocked('skip_locked')
      .where('o.status = :processing', { processing: OutboxStatus.PROCESSING })
      .andWhere(new Brackets((qb) => qb.where('o.lockedUntil IS NULL').orWhere('o.lockedUntil < NOW()')))
      .orderBy('o.createdAt', 'ASC')
      .limit(size)
      .getMany();

    const map = new Map<string, OutboxEntity>();

    for (const row of rowsByPending) {
      map.set(row.id, row);
    }

    for (const row of rowsByExpiredProcessing) {
      map.set(row.id, row);
    }

    return [...map.values()].sort((x, y) => x.createdAt.getTime() - y.createdAt.getTime()).slice(0, size);
  }

  async findByLockedBy(lockedBy: string, size = 100, em?: EntityManager) {
    return this.getRepository(em).find({
      where: {
        status: OutboxStatus.PROCESSING,
        lockedBy,
      },
      order: { createdAt: 'ASC' },
      take: size,
    });
  }

  async deleteByPublishedAfter7Days(em?: EntityManager) {
    await this.getRepository(em)
      .createQueryBuilder('o')
      .delete()
      .where('o.status = :status', { status: OutboxStatus.PUBLISHED })
      .andWhere(`o.createdAt < NOW() - INTERVAL '7 days'`)
      .execute();
  }

  async markProcessingMany(ids: string[], lockedBy: string, em?: EntityManager) {
    if (ids.length === 0) {
      return;
    }

    await this.getRepository(em)
      .createQueryBuilder()
      .update(OutboxEntity)
      .set({
        status: OutboxStatus.PROCESSING,
        lockedBy,
        lockedUntil: () => `NOW() + INTERVAL '60 seconds'`,
        updatedAt: () => 'NOW()',
      })
      .where('id IN (:...ids)', { ids })
      .andWhere(
        new Brackets((qb) => {
          qb.where('status = :pending', { pending: OutboxStatus.PENDING }).orWhere(
            new Brackets((qb) => {
              qb.where('status = :processing', { processing: OutboxStatus.PROCESSING }).andWhere('(lockedUntil IS NULL OR lockedUntil < NOW())');
            }),
          );
        }),
      )
      .execute();
  }

  async markPublished(id: string, lockedBy: string, em?: EntityManager) {
    await this.getRepository(em).update(
      { id, status: OutboxStatus.PROCESSING, lockedBy },
      {
        status: OutboxStatus.PUBLISHED,
        lockedBy: null,
        lockedUntil: null,
        lastError: null,
        lastAttemptAt: () => 'NOW()',
        updatedAt: () => 'NOW()',
      },
    );
  }

  async markFailed(id: string, lockedBy: string, error: string, em?: EntityManager) {
    await this.getRepository(em).update(
      { id, status: OutboxStatus.PROCESSING, lockedBy },
      {
        status: OutboxStatus.PENDING,
        lockedBy: null,
        lockedUntil: null,
        lastError: error,
        attempts: () => 'attempts + 1',
        lastAttemptAt: () => 'NOW()',
        updatedAt: () => 'NOW()',
      },
    );
  }
}
