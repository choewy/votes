import { Module } from '@nestjs/common';

import { TopicApplicationModule } from '@application/topic/module';

import { TopicModule } from '../module';

import { TopicController } from './topic.controller';

@Module({
  imports: [TopicModule, TopicApplicationModule],
  controllers: [TopicController],
})
export class TopicHttpModule {}
