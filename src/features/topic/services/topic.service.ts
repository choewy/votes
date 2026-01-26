import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TransactionalService } from '@core/database';
import { EntityManager, Repository } from 'typeorm';

import { TopicEntity } from '../domain';
import { TopicNotFoundException } from '../exceptions';

@Injectable()
export class TopicService extends TransactionalService<TopicEntity> {
  constructor(
    @InjectRepository(TopicEntity)
    topicRepository: Repository<TopicEntity>,
  ) {
    super(topicRepository);
  }

  async insert(title: string, em?: EntityManager) {
    return this.getRepository(em).save({ title });
  }

  async findByIdWithOptionsOrThrow(id: string, em?: EntityManager) {
    const topic = await this.getRepository(em).findOne({
      relations: { options: true },
      where: { id },
    });

    if (!topic) {
      throw new TopicNotFoundException(id);
    }

    return topic;
  }
}
