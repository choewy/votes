import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { UpdateTopicOptionRequestDTO } from './update-topic-option.request.dto';

export class UpdateTopicRequestDTO {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @ApiProperty({ type: UpdateTopicOptionRequestDTO, isArray: true })
  @IsArray()
  @ArrayMaxSize(20)
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => UpdateTopicOptionRequestDTO)
  readonly options: UpdateTopicOptionRequestDTO[];
}
