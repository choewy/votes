import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Configuration, ConfigurationModule, ContextModule, HttpExceptionFilter, OutboxCoreModule, RedisModule, VALIDATION_PIPE } from '@libs/core';
import { ENTITIES } from '@libs/domain';
import { JwtAuthGuard } from '@libs/features';

import { AuthHttpModule } from './features/auth';
import { HealthHttpModule } from './features/health';
import { TopicHttpModule } from './features/topic';

@Module({
  imports: [
    ConfigurationModule.forRoot(),
    ContextModule.forRoot(),
    TypeOrmModule.forRootAsync({
      inject: [Configuration],
      useFactory(configuration: Configuration) {
        return configuration.createTypeormModuleOptions(ENTITIES);
      },
    }),
    RedisModule.forRootAsync({
      inject: [Configuration],
      useFactory(configuration: Configuration) {
        return configuration.redisModuleOptions;
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
    HealthHttpModule,
    AuthHttpModule,
    TopicHttpModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: VALIDATION_PIPE,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class ApiModule {}
