import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Configuration, ConfigurationModule } from '@core/configs';
import { OutboxDispatcherModule } from '@core/outbox';
import { TopicJobsModule } from '@features/topic/workers';

@Module({
  imports: [
    ConfigurationModule.forRoot(),
    TypeOrmModule.forRootAsync({
      inject: [Configuration],
      useFactory(configuration: Configuration) {
        return configuration.typeormModuleOptions;
      },
    }),
    BullModule.forRootAsync({
      inject: [Configuration],
      useFactory(configuration: Configuration) {
        return {
          connection: configuration.redisModuleOptions,
        };
      },
    }),
    OutboxDispatcherModule,
    TopicJobsModule,
  ],
})
export class WorkerModule {}
