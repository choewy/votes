import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { CreateTopicUseCase, ParticipateTopicUseCase } from '@libs/application';
import { ContextService, ParseIntStringPipe, Serialize } from '@libs/core';
import { JwtRequestUser, TopicService } from '@libs/features';

import { CreateTopicRequestDTO, ParticipateTopicRequestDTO, TopicResponseDTO } from './dto';

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
  @ApiOperation({ summary: '투표 주제 조회' })
  @ApiOkResponse({ type: TopicResponseDTO })
  getTopic(@Param('id', new ParseIntStringPipe()) id: string) {
    return this.topicService.findByIdWithOptionsOrThrow(id);
  }

  @Post()
  @Serialize(TopicResponseDTO)
  @ApiOperation({ summary: '투표 주제 생성' })
  @ApiCreatedResponse({ type: TopicResponseDTO })
  createTopic(@Body() body: CreateTopicRequestDTO) {
    return this.createTopicUseCase.execute({
      userId: this.contextService.user.id,
      title: body.title,
      options: body.options.map(({ value }) => value),
    });
  }

  @Post(':id/participate')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '투표 옵션 선택(참여)' })
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
  @ApiOperation({ summary: '투표 내용 변경' })
  @ApiNoContentResponse()
  updateTopic(@Param('id', new ParseIntStringPipe()) id: string) {
    // TODO topic.userId !== this.contextService.user.id인 경우 수정 불가
    // TODO topic.total > 0인 경우 수정 불가
    return id;
  }
}
