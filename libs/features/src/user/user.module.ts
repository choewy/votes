import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '@libs/domain';

import { UserService } from './user.service';

const UserModuleProviders = [UserService];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: UserModuleProviders,
  exports: UserModuleProviders,
})
export class UserModule {}
