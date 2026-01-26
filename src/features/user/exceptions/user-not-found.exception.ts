import { HttpStatus } from '@nestjs/common';

import { DomainException } from '@core/exceptions';

export class UserNotFoundException extends DomainException {
  constructor(public readonly userId: string) {
    super('USER_NOT_FOUND', HttpStatus.NOT_FOUND, 'User not found', { userId });
  }
}
