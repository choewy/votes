import { Injectable } from '@nestjs/common';

import { HistoryService } from '@features/history/services';
import { OptionService, TopicService } from '@features/topic/services';
import { DataSource } from 'typeorm';

@Injectable()
export class ParticipateTopicUseCase {
  constructor(
    private readonly dataSource: DataSource,
    private readonly topicService: TopicService,
    private readonly optionService: OptionService,
    private readonly historyService: HistoryService,
  ) {}
}
