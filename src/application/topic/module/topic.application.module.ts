import { BullModule } from '@nestjs/bullmq';
import { forwardRef, Module } from '@nestjs/common';

import { OutboxCoreModule } from '@core/outbox';
import { HistoryModule } from '@features/history/module';
import { TopicModule } from '@features/topic/module';
import { UserModule } from '@features/user/module';

import { CreateTopicUseCase, ParticipateTopicUseCase } from '../usecases';

const TopicApplicationModuleProviders = [CreateTopicUseCase, ParticipateTopicUseCase];

@Module({
  imports: [forwardRef(() => OutboxCoreModule), UserModule, TopicModule, HistoryModule, BullModule.registerQueue({ name: 'topic' })],
  providers: TopicApplicationModuleProviders,
  exports: TopicApplicationModuleProviders,
})
export class TopicApplicationModule {}
