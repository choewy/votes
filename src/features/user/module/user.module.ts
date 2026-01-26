import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../domain';
import { UserService } from '../services';

const UserModuleProviders = [UserService];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: UserModuleProviders,
  exports: UserModuleProviders,
})
export class UserModule {}
