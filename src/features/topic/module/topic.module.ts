import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OptionEntity, TopicEntity } from '../domain';
import { OptionService, TopicService } from '../services';

const TopicModuleProviders = [TopicService, OptionService];

@Module({
  imports: [TypeOrmModule.forFeature([TopicEntity]), TypeOrmModule.forFeature([OptionEntity])],
  providers: TopicModuleProviders,
  exports: TopicModuleProviders,
})
export class TopicModule {}
