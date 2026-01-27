import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';

import { HistoryModule, TopicModule } from '@libs/features';

import { TopicParticipantProcessor } from './topic-participant.processor';

@Module({
  imports: [BullModule.registerQueue({ name: 'topic' }), HistoryModule, TopicModule],
  providers: [TopicParticipantProcessor],
})
export class TopicJobsModule {}
