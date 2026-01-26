import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TransactionalService } from '@core/database';
import { EntityManager, Repository } from 'typeorm';

import { HistoryEntity } from '../domain';
import { HistoryAlreadyExistException, HistoryNotFoundException } from '../exceptions';

@Injectable()
export class HistoryService extends TransactionalService<HistoryEntity> {
  constructor(
    @InjectRepository(HistoryEntity)
    historyRepository: Repository<HistoryEntity>,
  ) {
    super(historyRepository);
  }

  async insert(userId: string, topicId: string, optionId: string, em?: EntityManager) {
    return this.getRepository(em).save({ userId, topicId, optionId });
  }

  async findByUserIdAndTopicIdOrThrow(userId: string, topicId: string, em?: EntityManager) {
    const history = await this.getRepository(em).findOneBy({ userId, topicId });

    if (!history) {
      throw new HistoryNotFoundException(userId, topicId);
    }

    return history;
  }

  async throwIfExistsByUserIdAndTopicId(userId: string, topicId: string, em?: EntityManager) {
    if (await this.getRepository(em).existsBy({ userId, topicId })) {
      throw new HistoryAlreadyExistException(userId, topicId);
    }
  }
}
