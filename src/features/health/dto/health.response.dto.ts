import { ApiProperty } from '@nestjs/swagger';

import { NodeEnv } from '@core/configs';
import { Expose } from 'class-transformer';

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
