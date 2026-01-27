import { BullModule } from '@nestjs/bullmq';
import { forwardRef, Module } from '@nestjs/common';

import { OutboxCoreModule } from '@libs/core';
import { HistoryModule, TopicModule, UserModule } from '@libs/features';

import { CreateTopicUseCase, ParticipateTopicUseCase } from './usecases';

const TopicApplicationModuleProviders = [CreateTopicUseCase, ParticipateTopicUseCase];

@Module({
  imports: [forwardRef(() => OutboxCoreModule), UserModule, TopicModule, HistoryModule, BullModule.registerQueue({ name: 'topic' })],
  providers: TopicApplicationModuleProviders,
  exports: TopicApplicationModuleProviders,
})
export class TopicApplicationModule {}
