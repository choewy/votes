import { DynamicModule, Module, Provider } from '@nestjs/common';

import { RedisClient } from './redis.client';
import { RedisModuleAsyncOptions } from './types';

@Module({})
export class RedisModule {
  private static createProvider(options: RedisModuleAsyncOptions): Provider {
    return {
      inject: options.inject,
      provide: RedisClient,
      useFactory(...args: unknown[]) {
        return new RedisClient(options.useFactory(...args));
      },
    };
  }

  public static forRootAsync(options: RedisModuleAsyncOptions): DynamicModule {
    const provider = this.createProvider(options);

    return {
      global: true,
      module: RedisModule,
      providers: [provider],
      exports: [provider],
    };
  }
}
