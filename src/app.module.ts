import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Configuration, ConfigurationModule } from '@core/configs';
import { RedisModule } from '@core/redis';
import { TopicHttpModule } from '@features/topic/application';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigurationModule.forRoot(),
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
      useFactory() {
        return new ValidationPipe({
          whitelist: true,
          forbidNonWhitelisted: true,
          transform: true,
        });
      },
    },
  ],
})
export class AppModule {}
