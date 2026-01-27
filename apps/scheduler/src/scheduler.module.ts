import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Configuration, ConfigurationModule, OutboxDispatcherModule } from '@libs/core';
import { ENTITIES } from '@libs/domain';

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
    OutboxDispatcherModule,
  ],
})
export class SchedulerModule {}
