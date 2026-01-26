import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';

export class TopicOptionResponseDTO {
  @ApiProperty({ type: String })
  @Expose()
  id: string;

  @ApiProperty({ type: String })
  @Expose()
  value: string;

  @ApiProperty({ type: Number })
  @Expose()
  count: number;
}
