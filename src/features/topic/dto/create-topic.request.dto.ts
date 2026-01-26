import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { CreateTopicOptionRequestDTO } from './create-topic-option.request.dto';

export class CreateTopicRequestDTO {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ type: CreateTopicOptionRequestDTO, isArray: true })
  @IsArray()
  @ArrayMaxSize(20)
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateTopicOptionRequestDTO)
  readonly options: CreateTopicOptionRequestDTO[];
}
