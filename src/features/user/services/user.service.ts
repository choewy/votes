import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TransactionalService } from '@core/database';
import { EntityManager, Repository } from 'typeorm';

import { UserEntity } from '../domain';
import { UserNotFoundException } from '../exceptions';

@Injectable()
export class UserService extends TransactionalService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }

  async findByIdOrThrow(id: string, em?: EntityManager) {
    const user = await this.getRepository(em).findOneBy({ id });

    if (!user) {
      throw new UserNotFoundException(id);
    }

    return user;
  }
}
