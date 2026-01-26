import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { Queue } from 'bullmq';
import { DataSource } from 'typeorm';

import { OutboxEventType } from './enums';
import { OutboxEntity } from './outbox.entity';
import { OutboxService } from './outbox.service';

@Injectable()
export class OutboxDispatcher {
  constructor(
    private readonly dataSource: DataSource,
    private readonly outboxService: OutboxService,
    @InjectQueue('topic')
    private readonly topicQueue: Queue,
  ) {}

  @Cron('*/3 * * * * *')
  async dispatch(): Promise<void> {
    const events = await this.dataSource.transaction(async (em) => {
      const rows = await this.outboxService.findByDispatchTargets(em);
      const rowsIds = rows.map((row) => row.id);

      await this.outboxService.markProcessingMany(rowsIds, em);

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

      await this.outboxService.markPublished(event.id);
    } catch (e) {
      const error = e instanceof Error ? e.message : String(e);
      await this.outboxService.markFailed(event.id, error);
    }
  }
}
