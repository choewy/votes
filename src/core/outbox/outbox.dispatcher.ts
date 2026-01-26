import { InjectQueue } from '@nestjs/bullmq';
import { Cron } from '@nestjs/schedule';

import { Queue } from 'bullmq';
import { Brackets, DataSource, In } from 'typeorm';
import { v4 } from 'uuid';

import { OutboxEventType, OutboxStatus } from './enums';
import { OutboxEntity } from './outbox.entity';

export class OutboxDispatcher {
  private readonly workerId = `dispatcher:${process.pid}:${v4()}`;

  constructor(
    private readonly dataSource: DataSource,
    @InjectQueue('topic')
    private readonly topicQueue: Queue,
  ) {}

  @Cron('*/3 * * * * *')
  async dispatch(): Promise<void> {
    const events = await this.dataSource.transaction(async (em) => {
      const repository = em.getRepository(OutboxEntity);
      const rows = await repository
        .createQueryBuilder('o')
        .setLock('pessimistic_write')
        .where('o.status = :pending', { pending: 'PENDING' })
        .orWhere(new Brackets((qb) => qb.where('o.status = :processing', { processing: 'PROCESSING' }).andWhere('o.lockedUntil IS NOT NULL').andWhere('o.lockedUntil < NOW()')))
        .orderBy('o.createdAt', 'ASC')
        .limit(100)
        .getMany();

      if (rows.length > 0) {
        const ids = rows.map((r) => r.id);
        await repository.update(
          { id: In(ids) },
          {
            status: OutboxStatus.PROCESSING,
            lockedBy: this.workerId,
            lockedUntil: () => `NOW() + INTERVAL '5 seconds'`,
            updatedAt: () => 'NOW()',
          },
        );
      }

      return rows;
    });

    for (const event of events) {
      await this.publish(event);
    }
  }

  private async publish(event: OutboxEntity) {
    try {
      if (event.eventType === OutboxEventType.TOPIC_PARTICIPATED) {
        await this.topicQueue.add('participate', event.payload, {
          jobId: `outbox:${event.id}`,
          removeOnComplete: true,
          attempts: 5,
          backoff: { type: 'exponential', delay: 1000 },
        });
      }

      await this.dataSource.getRepository(OutboxEntity).update(
        { id: event.id },
        {
          status: OutboxStatus.PUBLISHED,
          lockedBy: null,
          lockedUntil: null,
          lastError: null,
          lastAttemptAt: () => 'NOW()',
          updatedAt: () => 'NOW()',
        },
      );
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      await this.dataSource.getRepository(OutboxEntity).update(
        { id: event.id },
        {
          status: OutboxStatus.PENDING,
          lockedBy: null,
          lockedUntil: null,
          lastError: message,
          attempts: () => 'attempts + 1',
          lastAttemptAt: () => 'NOW()',
          updatedAt: () => 'NOW()',
        },
      );
    }
  }
}
