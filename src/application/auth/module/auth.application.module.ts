import { Module } from '@nestjs/common';

import { AuthModule } from '@features/auth/module';
import { UserModule } from '@features/user/module';

import { LoginUseCase, RegisterUseCase } from '../usecases';

const AuthApplicationModuleProvider = [LoginUseCase, RegisterUseCase];

@Module({
  imports: [UserModule, AuthModule],
  providers: AuthApplicationModuleProvider,
  exports: AuthApplicationModuleProvider,
})
export class AuthApplicationModule {}
