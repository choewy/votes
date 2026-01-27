import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { Queue } from 'bullmq';
import { DataSource } from 'typeorm';
import { v4 } from 'uuid';

import { OutboxEventType } from './enums';
import { OutboxEntity } from './outbox.entity';
import { OutboxService } from './outbox.service';

@Injectable()
export class OutboxDispatcher {
  private readonly processId = `${process.pid}:${v4()}`;

  constructor(
    private readonly dataSource: DataSource,
    private readonly outboxService: OutboxService,
    @InjectQueue('topic.participant')
    private readonly topicParticipantQueue: Queue,
  ) {}

  @Cron('*/3 * * * * *')
  async dispatch(): Promise<void> {
    const events = await this.dataSource.transaction(async (em) => {
      const rows = await this.outboxService.findByDispatchTargets(100, em);
      const rowsIds = rows.map((row) => row.id);
      await this.outboxService.markProcessingMany(rowsIds, this.processId, em);
      return this.outboxService.findByLockedBy(this.processId, 100, em);
    });

    for (const event of events) {
      await this.publish(event);
    }
  }

  @Cron('0 0 * * *')
  async clean(): Promise<void> {
    await this.outboxService.deleteByPublishedAfter7Days();
  }

  private async publish(event: OutboxEntity) {
    try {
      if (event.eventType === OutboxEventType.TOPIC_PARTICIPATED) {
        await this.topicParticipantQueue.add('participant', event.payload, {
          jobId: `topic:participant:${event.id}`,
          removeOnComplete: true,
          attempts: 5,
          backoff: { type: 'exponential', delay: 1000 },
        });
      }

      await this.outboxService.markPublished(event.id, this.processId);
    } catch (e) {
      const error = e instanceof Error ? e.message : String(e);
      await this.outboxService.markFailed(event.id, this.processId, error);
    }
  }
}
