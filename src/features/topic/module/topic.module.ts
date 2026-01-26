import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TopicEntity } from '../domain';
import { TopicService } from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([TopicEntity])],
  providers: [TopicService],
  exports: [TopicService],
})
export class TopicModule {}
