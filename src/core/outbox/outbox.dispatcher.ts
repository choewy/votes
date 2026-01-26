import { InjectQueue } from '@nestjs/bullmq';
import { Cron } from '@nestjs/schedule';

import { Queue } from 'bullmq';
import { DataSource, In } from 'typeorm';

import { OutboxEventType, OutboxStatus } from './enums';
import { OutboxEntity } from './outbox.entity';

export class OutboxDispatcher {
  constructor(
    private readonly dataSource: DataSource,
    @InjectQueue('topic')
    private readonly topicQueue: Queue,
  ) {}

  @Cron('*/1 * * * * *')
  async dispatch(): Promise<void> {
    const events = await this.dataSource.transaction(async (em) => {
      const repository = em.getRepository(OutboxEntity);
      const rows = await repository.find({
        where: { status: OutboxStatus.PENDING },
        order: { createdAt: 'ASC' },
        lock: { mode: 'pessimistic_write' },
        take: 100,
      });

      if (rows.length > 0) {
        const ids = rows.map((r) => r.id);
        await repository.update({ id: In(ids) }, { status: OutboxStatus.PROCESSING, updatedAt: () => 'NOW()' });
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
          lastAttemptAt: new Date(),
          lastError: null,
        },
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      await this.dataSource.getRepository(OutboxEntity).update(
        { id: event.id },
        {
          status: OutboxStatus.PENDING,
          attempts: () => 'attempts + 1',
          lastAttemptAt: new Date(),
          lastError: message,
        },
      );
    }
  }
}
