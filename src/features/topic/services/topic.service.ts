import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TransactionalService } from '@core/database';
import { EntityManager, Repository } from 'typeorm';

import { TopicEntity } from '../domain';

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

  async findByIdWithOptions(id: string, em?: EntityManager) {
    return this.getRepository(em).findOneOrFail({
      relations: { options: true },
      where: { id },
    });
  }
}
