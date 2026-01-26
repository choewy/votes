import { Module } from '@nestjs/common';

import { HistoryModule } from '@features/history/module';
import { TopicModule } from '@features/topic/module';
import { UserModule } from '@features/user/module';

import { CreateTopicUseCase, ParticipateTopicUseCase } from '../usecases';

const TopicApplicationModuleProviders = [CreateTopicUseCase, ParticipateTopicUseCase];

@Module({
  imports: [UserModule, TopicModule, HistoryModule],
  providers: TopicApplicationModuleProviders,
  exports: TopicApplicationModuleProviders,
})
export class TopicApplicationModule {}
