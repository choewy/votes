import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Configuration, ConfigurationModule } from '@core/configs';
import { ContextModule } from '@core/context';
import { HttpExceptionFilter } from '@core/filters';
import { OutboxCoreModule } from '@core/outbox';
import { VALIDATION_PIPE } from '@core/pipes';
import { RedisModule } from '@core/redis';
import { AuthHttpModule } from '@features/auth/application';
import { JwtAuthGuard } from '@features/auth/guards';
import { HealthHttpModule } from '@features/health/application';
import { TopicHttpModule } from '@features/topic/application';

@Module({
  imports: [
    ConfigurationModule.forRoot(),
    ContextModule.forRoot(),
    TypeOrmModule.forRootAsync({
      inject: [Configuration],
      useFactory(configuration: Configuration) {
        return configuration.typeormModuleOptions;
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
export class AppModule {}
