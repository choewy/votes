import { applyDecorators, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { SerializeInterceptor } from './serialize.interceptor';

export function Serialize(DTO: new (...args: unknown[]) => unknown) {
  return applyDecorators(UseInterceptors(new SerializeInterceptor(DTO), new ClassSerializerInterceptor(new Reflector())));
}
