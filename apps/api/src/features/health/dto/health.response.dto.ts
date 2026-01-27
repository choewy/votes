import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';

import { NodeEnv } from '@libs/core';

export class HealthResponseDTO {
  @ApiProperty({ type: String })
  @Expose()
  name: string;

  @ApiProperty({ type: String })
  @Expose()
  version: string;

  @ApiProperty({ enum: NodeEnv })
  @Expose()
  env: NodeEnv;
}
