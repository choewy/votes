import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';

import { TopicOptionResponseDTO } from './topic-option.response.dto';

export class TopicResponseDTO {
  @ApiProperty({ type: String })
  @Expose()
  title: string;

  @ApiProperty({ type: TopicOptionResponseDTO, isArray: true })
  @Expose()
  options: TopicOptionResponseDTO[];

  @ApiProperty({ type: Date })
  @Expose()
  createdAt: Date;

  @ApiProperty({ type: Date })
  @Expose()
  updatedAt: Date;
}
