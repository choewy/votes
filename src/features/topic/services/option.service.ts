import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TransactionalService } from '@core/database';
import { EntityManager, Repository } from 'typeorm';

import { OptionEntity } from '../domain';

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
}
