import { Module } from '@nestjs/common';

import { HistoryModule } from '@features/history/module';
import { TopicModule } from '@features/topic/module';

import { CreateTopicUseCase, ParticipateTopicUseCase } from '../usecases';

const TopicApplicationModuleProviders = [CreateTopicUseCase, ParticipateTopicUseCase];

@Module({
  imports: [TopicModule, HistoryModule],
  providers: TopicApplicationModuleProviders,
  exports: TopicApplicationModuleProviders,
})
export class TopicApplicationModule {}
