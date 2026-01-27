import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OptionEntity, TopicEntity } from '@libs/domain';

import { OptionService } from './option.service';
import { TopicService } from './topic.service';

const TopicModuleProviders = [TopicService, OptionService];

@Module({
  imports: [TypeOrmModule.forFeature([TopicEntity, OptionEntity])],
  providers: TopicModuleProviders,
  exports: TopicModuleProviders,
})
export class TopicModule {}
