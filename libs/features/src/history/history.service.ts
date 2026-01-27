import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { EntityManager, Repository } from 'typeorm';

import { TransactionalService } from '@libs/core';
import { HistoryEntity } from '@libs/domain';

import { HistoryAlreadyExistException, HistoryNotFoundException } from './exceptions';

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
      throw new HistoryNotFoundException(undefined, userId, topicId);
    }

    return history;
  }

  async throwIfExistsByUserIdAndTopicId(userId: string, topicId: string, em?: EntityManager) {
    if (await this.getRepository(em).existsBy({ userId, topicId })) {
      throw new HistoryAlreadyExistException(userId, topicId);
    }
  }

  async setIsCounted(id: string, em?: EntityManager) {
    const repository = this.getRepository(em);
    const claim = await repository.update(
      { id, isCounted: false },
      {
        isCounted: true,
        updatedAt: () => 'NOW()',
      },
    );

    const history = await repository.findOneBy({ id });

    if (!claim.affected || claim.affected === 0) {
      if (!history) {
        throw new HistoryNotFoundException(id);
      }

      return null;
    }

    return history;
  }
}
