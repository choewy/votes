import { Module } from '@nestjs/common';

import { UserModule } from '@features/user/module';

@Module({
  imports: [UserModule],
})
export class UserApplicationModule {}
