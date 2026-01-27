import { HttpStatus } from '@nestjs/common';

import { DomainException } from '@core/exceptions';

export class InvalidTokenException extends DomainException {
  constructor() {
    super('INVALID_TOKEN', HttpStatus.UNAUTHORIZED, 'Invalid token');
  }
}
