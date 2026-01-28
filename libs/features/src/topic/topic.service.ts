import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { EntityManager, Repository } from 'typeorm';

import { TransactionalService } from '@libs/core';
import { TopicEntity } from '@libs/domain';

import { TopicNotFoundException } from './exceptions';

@Injectable()
export class TopicService extends TransactionalService<TopicEntity> {
  constructor(
    @InjectRepository(TopicEntity)
    topicRepository: Repository<TopicEntity>,
  ) {
    super(topicRepository);
  }

  async insert(userId: string, title: string, content: string, em?: EntityManager) {
    const repository = this.getRepository(em);
    const topic = repository.create({ userId, title, content });
    return repository.save(topic);
  }

  async update(id: string, title: string, content: string, em?: EntityManager) {
    return this.getRepository(em).update(id, {
      title,
      content,
      updatedAt: () => 'NOW()',
    });
  }

  async findByIdOrThrow(id: string, em?: EntityManager, lock?: boolean) {
    const topic = await this.getRepository(em).findOne({
      where: { id },
      lock: lock ? { mode: 'pessimistic_write' } : undefined,
    });

    if (!topic) {
      throw new TopicNotFoundException(id);
    }

    return topic;
  }

  async findByIdWithOptionsOrThrow(id: string, em?: EntityManager) {
    const topic = await this.getRepository(em).findOne({
      relations: { options: true },
      where: { id },
      order: { options: { id: 'ASC' } },
    });

    if (!topic) {
      throw new TopicNotFoundException(id);
    }

    return topic;
  }

  async increment(id: string, em?: EntityManager) {
    return this.getRepository(em).update(
      { id },
      {
        total: () => `total + 1`,
        updatedAt: () => 'NOW()',
      },
    );
  }
}
