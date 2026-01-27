import { Module } from '@nestjs/common';

import { TopicApplicationModule } from '@libs/application';
import { TopicModule } from '@libs/features';

import { TopicController } from './topic.controller';

@Module({
  imports: [TopicModule, TopicApplicationModule],
  controllers: [TopicController],
})
export class TopicHttpModule {}
