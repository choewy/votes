import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Configuration, ConfigurationModule, OutboxCoreModule } from '@libs/core';
import { ENTITIES } from '@libs/domain';

import { TopicJobsModule } from './features/topic';

@Module({
  imports: [
    ConfigurationModule.forRoot(),
    TypeOrmModule.forRootAsync({
      inject: [Configuration],
      useFactory(configuration: Configuration) {
        return configuration.createTypeormModuleOptions(ENTITIES);
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
    OutboxCoreModule,
    TopicJobsModule,
  ],
})
export class WorkerModule {}
