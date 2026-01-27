import { Module } from '@nestjs/common';

import { AuthApplicationModule } from '@libs/application';
import { JwtAuthGuard, JwtStrategy } from '@libs/features';

import { AuthController } from './auth.controller';

@Module({
  imports: [AuthApplicationModule],
  controllers: [AuthController],
  providers: [JwtStrategy, JwtAuthGuard],
})
export class AuthHttpModule {}
