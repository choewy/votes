import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';

import { ParticipantTopicProcessor } from './participant-topic.processor';

@Module({
  imports: [BullModule.registerQueue({ name: 'topic' })],
  providers: [ParticipantTopicProcessor],
})
export class TopicJobsModule {}
