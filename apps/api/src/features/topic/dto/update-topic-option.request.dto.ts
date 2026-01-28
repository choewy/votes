import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTopicOptionRequestDTO {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly value: string;
}
