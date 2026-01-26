import { ValidationPipe } from '@nestjs/common';

import { ValidationFailedException } from './validation.exception';

export const VALIDATION_PIPE = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  forbidUnknownValues: true,
  transform: true,
  transformOptions: { enableImplicitConversion: true },
  exceptionFactory(errors) {
    return new ValidationFailedException(errors);
  },
});
