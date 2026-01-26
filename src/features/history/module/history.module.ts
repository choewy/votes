import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HistoryEntity } from '../domain';
import { HistoryService } from '../services';

const HistoryModuleProviders = [HistoryService];

@Module({
  imports: [TypeOrmModule.forFeature([HistoryEntity])],
  providers: HistoryModuleProviders,
  exports: HistoryModuleProviders,
})
export class HistoryModule {}
