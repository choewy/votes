import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TransactionalService } from '@core';
import { Repository } from 'typeorm';

import { TopicEntity } from '../domain';

@Injectable()
export class TopicService extends TransactionalService<TopicEntity> {
  constructor(
    @InjectRepository(TopicEntity)
    topicRepository: Repository<TopicEntity>,
  ) {
    super(topicRepository);
  }
}
