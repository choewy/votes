import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';

import { HistoryModule } from '@features/history/module';

import { TopicModule } from '../module';

import { TopicParticipantProcessor } from './topic-participant.processor';

@Module({
  imports: [BullModule.registerQueue({ name: 'topic' }), HistoryModule, TopicModule],
  providers: [TopicParticipantProcessor],
})
export class TopicJobsModule {}
