import { Module } from '@nestjs/common';

import { AuthModule, UserModule } from '@libs/features';

import { LoginUseCase, RegisterUseCase } from './usecases';

const AuthApplicationModuleProvider = [LoginUseCase, RegisterUseCase];

@Module({
  imports: [UserModule, AuthModule],
  providers: AuthApplicationModuleProvider,
  exports: AuthApplicationModuleProvider,
})
export class AuthApplicationModule {}
