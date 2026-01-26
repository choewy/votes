import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OutboxEntity } from './outbox.entity';
import { OutboxService } from './outbox.service';

@Module({
  imports: [TypeOrmModule.forFeature([OutboxEntity]), BullModule.registerQueue({ name: 'topic' })],
  providers: [OutboxService],
  exports: [OutboxService],
})
export class OutboxCoreModule {}
