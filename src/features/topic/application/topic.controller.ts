import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse } from '@nestjs/swagger';

import { CreateTopicUseCase, ParticipateTopicUseCase } from '@application/topic/usecases';
import { ContextService } from '@core/context';
import { Serialize } from '@core/interceptors';
import { ParseIntStringPipe } from '@core/pipes';
import { JwtRequestUser } from '@features/auth/strategies/types';

import { CreateTopicRequestDTO, ParticipateTopicRequestDTO, TopicResponseDTO } from '../dto';
import { TopicService } from '../services';

@Controller('topics')
export class TopicController {
  constructor(
    private readonly contextService: ContextService<JwtRequestUser>,
    private readonly topicService: TopicService,
    private readonly createTopicUseCase: CreateTopicUseCase,
    private readonly participateTopicUseCase: ParticipateTopicUseCase,
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
  participateTopic(@Param('id', new ParseIntStringPipe()) id: string, @Body() body: ParticipateTopicRequestDTO) {
    return this.participateTopicUseCase.execute({
      userId: this.contextService.user.id,
      topicId: id,
      optionId: body.optionId,
    });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  updateTopic(@Param('id', new ParseIntStringPipe()) id: string) {
    // TODO
    return id;
  }
}
