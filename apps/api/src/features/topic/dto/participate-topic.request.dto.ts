import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsNumberString } from 'class-validator';

export class ParticipateTopicRequestDTO {
  @ApiProperty({ type: String })
  @IsNumberString()
  @IsNotEmpty()
  readonly optionId: string;
}
