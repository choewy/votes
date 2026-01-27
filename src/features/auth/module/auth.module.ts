import { Module } from '@nestjs/common';

import { AuthService } from '../services';

@Module({
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
