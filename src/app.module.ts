import { Module } from '@nestjs/common';

import { RedisModule } from '@libs/redis';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Configuration, ConfigurationModule } from './configs';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
