import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TransactionalService } from '@core/database';
import { EntityManager, Repository } from 'typeorm';

import { UserEntity } from '../domain';
import { UserAlreadyExistEmailException, UserNotFoundException } from '../exceptions';

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

  async findByEmail(email: string, em?: EntityManager) {
    return this.getRepository(em).findOneBy({ email });
  }

  async throwIfHasByEmail(email: string, em?: EntityManager) {
    if (await this.getRepository(em).existsBy({ email })) {
      throw new UserAlreadyExistEmailException(email);
    }
  }

  async insert(email: string, name: string, hashedPassword: string, em?: EntityManager) {
    const repository = this.getRepository(em);

    return repository.save(
      repository.create({
        email,
        name,
        password: hashedPassword,
      }),
    );
  }
}
