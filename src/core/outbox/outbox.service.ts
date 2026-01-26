import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TransactionalService } from '@core/database';
import { Brackets, EntityManager, In, Repository } from 'typeorm';

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

  async findByDispatchTargets(em?: EntityManager) {
    return this.getRepository(em)
      .createQueryBuilder('o')
      .setLock('pessimistic_write')
      .where('o.status = :pending', { pending: OutboxStatus.PENDING })
      .orWhere(
        new Brackets((qb) =>
          qb
            .where('o.status = :processing', {
              processing: OutboxStatus.PROCESSING,
            })
            .andWhere('o.lockedUntil IS NOT NULL')
            .andWhere('o.lockedUntil < NOW()'),
        ),
      )
      .orderBy('o.createdAt', 'ASC')
      .limit(100)
      .getMany();
  }

  async markProcessing(id: string, em?: EntityManager) {
    await this.getRepository(em).update(
      { id },
      {
        status: OutboxStatus.PROCESSING,
        lockedBy: process.pid,
        lockedUntil: () => `NOW() + INTERVAL '5 seconds'`,
        updatedAt: () => 'NOW()',
      },
    );
  }
  async markProcessingMany(ids: string[], em?: EntityManager) {
    if (ids.length === 0) {
      return;
    }

    await this.getRepository(em).update(
      { id: In(ids) },
      {
        status: OutboxStatus.PROCESSING,
        lockedBy: process.pid,
        lockedUntil: () => `NOW() + INTERVAL '5 seconds'`,
        updatedAt: () => 'NOW()',
      },
    );
  }

  async markPublished(id: string, em?: EntityManager) {
    await this.getRepository(em).update(
      { id },
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

  async markFailed(id: string, error: string, em?: EntityManager) {
    await this.getRepository(em).update(
      { id },
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
