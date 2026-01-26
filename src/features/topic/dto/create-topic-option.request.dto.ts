import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

export class CreateTopicOptionRequestDTO {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly value: string;
}
