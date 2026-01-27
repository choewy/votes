import { HttpStatus } from '@nestjs/common';

import { DomainException } from '@libs/core';

export class UserAlreadyExistEmailException extends DomainException {
  constructor(public readonly email: string) {
    super('USER_ALREADY_EXIST', HttpStatus.CONFLICT, 'User already exist email', { email });
  }
}
