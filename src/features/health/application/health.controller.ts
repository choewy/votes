import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { Serialize } from '@core/interceptors';
import { Public } from '@features/auth/decorators';

import { HealthResponseDTO } from '../dto';

@Public()
@Controller()
export class HealthController {
  @Get()
  @Serialize(HealthResponseDTO)
  @ApiOkResponse({ type: HealthResponseDTO })
  healthCheck() {
    return {
      name: process.env.npm_package_name,
      version: process.env.npm_package_version,
      env: process.env.NODE_ENV,
    };
  }
}
