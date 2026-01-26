import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TransactionalService } from '@core';
import { Repository } from 'typeorm';

import { UserEntity } from '../domain';

@Injectable()
export class UserService extends TransactionalService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }
}
