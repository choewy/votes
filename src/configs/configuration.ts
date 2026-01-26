import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { RedisModuleOptions } from '@libs/redis';

@Injectable()
export class Configuration {
  constructor(private readonly configService: ConfigService) {}

  get port(): number {
    return +this.configService.getOrThrow<string>('PORT');
  }

  get redisModuleOptions(): RedisModuleOptions {
    return {
      host: this.configService.getOrThrow<string>('REDIS_HOST'),
      port: +this.configService.getOrThrow<string>('REDIS_PORT'),
    };
  }
}
