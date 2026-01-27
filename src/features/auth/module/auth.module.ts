import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { Configuration } from '@core/configs';

import { AuthService } from '../services';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [Configuration],
      useFactory(configuration: Configuration) {
        return configuration.jwtModuleOptions;
      },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
