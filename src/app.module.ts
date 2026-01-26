import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Configuration, ConfigurationModule } from './configs';
import { RedisModule } from '@libs/redis';

@Module({
  imports: [
    ConfigurationModule.forRoot(),
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
