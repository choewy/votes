import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import path from 'node:path';
import { RedisModuleOptions } from '@core/redis';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { NodeEnv } from './enums';

@Injectable()
export class Configuration {
  constructor(private readonly configService: ConfigService) {}

  get nodeEnv() {
    return this.configService.get<NodeEnv>('NODE_ENV') ?? NodeEnv.Development;
  }

  get isLocal() {
    return this.nodeEnv === NodeEnv.Local;
  }

  get port(): number {
    return +this.configService.getOrThrow<string>('PORT');
  }

  get typeormModuleOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.getOrThrow<string>('POSTGRES_HOST'),
      port: +this.configService.getOrThrow<string>('POSTGRES_PORT'),
      username: this.configService.getOrThrow<string>('POSTGRES_USERNAME'),
      password: this.configService.getOrThrow<string>('POSTGRES_PASSWORD'),
      database: this.configService.getOrThrow<string>('POSTGRES_DATABASE'),
      synchronize: this.isLocal,
      namingStrategy: new SnakeNamingStrategy(),
      entities: [path.resolve(process.cwd(), 'dist', '**', '*', 'domain', '**', '*.entity.js')],
      logging: true,
    };
  }

  get redisModuleOptions(): RedisModuleOptions {
    return {
      host: this.configService.getOrThrow<string>('REDIS_HOST'),
      port: +this.configService.getOrThrow<string>('REDIS_PORT'),
    };
  }
}
