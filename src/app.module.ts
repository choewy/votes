import { Module } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Configuration, ConfigurationModule } from '@core/configs';
import { ContextModule } from '@core/context';
import { HttpExceptionFilter } from '@core/filters';
import { VALIDATION_PIPE } from '@core/pipes';
import { RedisModule } from '@core/redis';
import { TopicHttpModule } from '@features/topic/application';

import { AppController } from './app.controller';
import { AppService } from './app.service';

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
    TopicHttpModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: VALIDATION_PIPE,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
