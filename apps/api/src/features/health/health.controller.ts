import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Serialize } from '@libs/core';
import { Public } from '@libs/features';

import { HealthResponseDTO } from './dto';

@ApiTags('헬스')
@Public()
@Controller()
export class HealthController {
  @Get()
  @Serialize(HealthResponseDTO)
  @ApiOperation({ summary: '헬스체크', security: [] })
  @ApiOkResponse({ type: HealthResponseDTO })
  healthCheck() {
    return {
      name: process.env.npm_package_name,
      version: process.env.npm_package_version,
      env: process.env.NODE_ENV,
    };
  }
}
