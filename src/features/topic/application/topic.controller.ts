import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse } from '@nestjs/swagger';

import { CreateTopicUseCase } from '@application/topic/usecases';
import { Serialize } from '@core/interceptors';
import { ParseIntStringPipe } from '@core/pipes';

import { CreateTopicRequestDTO, TopicResponseDTO } from '../dto';
import { TopicService } from '../services';

@Controller('topics')
export class TopicController {
  constructor(
    private readonly topicService: TopicService,
    private readonly createTopicUseCase: CreateTopicUseCase,
  ) {}

  @Get(':id')
  @Serialize(TopicResponseDTO)
  @ApiOkResponse({ type: TopicResponseDTO })
  getTopic(@Param('id', new ParseIntStringPipe()) id: string) {
    return this.topicService.findByIdWithOptionsOrThrow(id);
  }

  @Post()
  @Serialize(TopicResponseDTO)
  @ApiCreatedResponse({ type: TopicResponseDTO })
  createTopic(@Body() body: CreateTopicRequestDTO) {
    return this.createTopicUseCase.execute({
      title: body.title,
      options: body.options.map(({ value }) => value),
    });
  }

  @Post(':id/participate')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  participateTopic(@Param('id', new ParseIntStringPipe()) id: string) {
    // TODO
    return id;
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  updateTopic(@Param('id', new ParseIntStringPipe()) id: string) {
    // TODO
    return id;
  }
}
