import { HttpStatus } from '@nestjs/common';

import { DomainException } from '@libs/core';

export class InvalidEmailOrPasswordException extends DomainException {
  constructor() {
    super('INVALID_EMAIL_OR_PASSWORD', HttpStatus.UNAUTHORIZED, 'Invalid email or password');
  }
}
