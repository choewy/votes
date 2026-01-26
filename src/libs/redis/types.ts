import { InjectionToken, OptionalFactoryDependency } from '@nestjs/common';

import { RedisOptions } from 'ioredis';

export type RedisModuleOptions = RedisOptions;
export type RedisModuleAsyncOptions = {
  inject?: (InjectionToken | OptionalFactoryDependency)[];
  useFactory(...args: unknown[]): RedisModuleOptions;
};
