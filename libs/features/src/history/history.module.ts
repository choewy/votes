import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HistoryEntity } from '@libs/domain';

import { HistoryService } from './history.service';

const HistoryModuleProviders = [HistoryService];

@Module({
  imports: [TypeOrmModule.forFeature([HistoryEntity])],
  providers: HistoryModuleProviders,
  exports: HistoryModuleProviders,
})
export class HistoryModule {}
