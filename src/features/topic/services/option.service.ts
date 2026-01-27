import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TransactionalService } from '@core/database';
import { EntityManager, Repository } from 'typeorm';

import { OptionEntity } from '../domain';
import { OptionNotFoundException } from '../exceptions';

@Injectable()
export class OptionService extends TransactionalService<OptionEntity> {
  constructor(
    @InjectRepository(OptionEntity)
    optionRepository: Repository<OptionEntity>,
  ) {
    super(optionRepository);
  }

  async insertBulk(topicId: string, values: string[], em?: EntityManager) {
    return this.getRepository(em).save(values.map((value) => ({ value, topicId })));
  }

  async findByIdOrThrow(id: string, em?: EntityManager) {
    const option = await this.getRepository(em).findOneBy({ id });

    if (!option) {
      throw new OptionNotFoundException(id);
    }

    return option;
  }

  async findByIdAndTopicIdOrThrow(id: string, topicId: string, em?: EntityManager) {
    const option = await this.getRepository(em).findOneBy({ id, topicId });

    if (!option) {
      throw new OptionNotFoundException(id, topicId);
    }

    return option;
  }

  async increment(id: string, em?: EntityManager) {
    return this.getRepository(em).update(
      { id },
      {
        count: () => `count + 1`,
        updatedAt: () => 'NOW()',
      },
    );
  }
}
