import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OutboxDispatcher } from './outbox.dispatcher';
import { OutboxEntity } from './outbox.entity';
import { OutboxService } from './outbox.service';

@Module({
  imports: [TypeOrmModule.forFeature([OutboxEntity]), ScheduleModule.forRoot(), BullModule.registerQueue({ name: 'topic.participant' })],
  providers: [OutboxService, OutboxDispatcher],
  exports: [OutboxService],
})
export class OutboxDispatcherModule {}
