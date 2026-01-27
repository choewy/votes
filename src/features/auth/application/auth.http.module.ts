import { Module } from '@nestjs/common';

import { AuthApplicationModule } from '@application/auth/module';

import { JwtAuthGuard } from '../guards';
import { JwtStrategy } from '../strategies';

import { AuthController } from './auth.controller';

@Module({
  imports: [AuthApplicationModule],
  controllers: [AuthController],
  providers: [JwtStrategy, JwtAuthGuard],
})
export class AuthHttpModule {}
