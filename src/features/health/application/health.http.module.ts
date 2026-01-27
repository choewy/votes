import { Module } from '@nestjs/common';

import { HealthModule } from '../module';

import { HealthController } from './health.controller';

@Module({
  imports: [HealthModule],
  controllers: [HealthController],
})
export class HealthHttpModule {}
