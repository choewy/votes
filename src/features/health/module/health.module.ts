import { Module } from '@nestjs/common';

import { HealthService } from '../services';

@Module({
  providers: [HealthService],
  exports: [HealthService],
})
export class HealthModule {}
