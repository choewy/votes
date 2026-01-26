import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TransactionalService } from '@core/database';
import { EntityManager, Repository } from 'typeorm';

import { HistoryEntity } from '../domain';
import { HistoryAlreadyExistException } from '../exceptions';

@Injectable()
export class HistoryService extends TransactionalService<HistoryEntity> {
  constructor(
    @InjectRepository(HistoryEntity)
    historyRepository: Repository<HistoryEntity>,
  ) {
    super(historyRepository);
  }

  async insert(userId: string, topicId: string, optionId: string, em?: EntityManager) {
    await this.getRepository(em).insert({ userId, topicId, optionId });
  }

  async throwIfExistsByUserIdAndTopicId(userId: string, topicId: string, em?: EntityManager) {
    if (await this.getRepository(em).existsBy({ userId, topicId })) {
      throw new HistoryAlreadyExistException(userId, topicId);
    }
  }
}
