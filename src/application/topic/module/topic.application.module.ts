import { Module } from '@nestjs/common';

import { TopicModule } from '@features/topic/module';

import { CreateTopicUseCase } from '../usecases';

const TopicApplicationModuleProviders = [CreateTopicUseCase];

@Module({
  imports: [TopicModule],
  providers: TopicApplicationModuleProviders,
  exports: TopicApplicationModuleProviders,
})
export class TopicApplicationModule {}
