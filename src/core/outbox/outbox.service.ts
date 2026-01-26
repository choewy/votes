import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TransactionalService } from '@core/database';
import { EntityManager, Repository } from 'typeorm';

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
    });
  }

  async markProcessing(id: string, em?: EntityManager) {
    await this.getRepository(em).update({ id }, { status: OutboxStatus.PROCESSING });
  }

  async markPublished(id: string, em?: EntityManager) {
    await this.getRepository(em).update({ id }, { status: OutboxStatus.PUBLISHED });
  }

  async markFailed(id: string, error: string, em?: EntityManager) {
    await this.getRepository(em).update(
      { id },
      {
        status: OutboxStatus.FAILED,
        attempts: () => 'attempts + 1',
        lastAttemptAt: () => 'NOW()',
        lastError: error,
      },
    );
  }
}
