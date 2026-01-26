import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';

import { CreateTopicUseCase } from '@application/topic/usecases';
import { Serialize } from '@core/interceptors';

import { CreateTopicRequestDTO, TopicResponseDTO } from '../dto';

@Controller('topics')
export class TopicController {
  constructor(private readonly createTopicUseCase: CreateTopicUseCase) {}

  @Post()
  @Serialize(TopicResponseDTO)
  @ApiCreatedResponse({ type: TopicResponseDTO })
  createTopic(@Body() body: CreateTopicRequestDTO) {
    return this.createTopicUseCase.execute({
      title: body.title,
      options: body.options.map(({ value }) => value),
    });
  }
}
