import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TransactionalService } from '@core';
import { Repository } from 'typeorm';

import { HistoryEntity } from '../domain';

@Injectable()
export class HistoryService extends TransactionalService<HistoryEntity> {
  constructor(
    @InjectRepository(HistoryEntity)
    historyRepository: Repository<HistoryEntity>,
  ) {
    super(historyRepository);
  }
}
