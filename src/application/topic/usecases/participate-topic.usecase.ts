import { Injectable } from '@nestjs/common';

import { HistoryService } from '@features/history/services';
import { OptionService, TopicService } from '@features/topic/services';
import { UserService } from '@features/user/services';

import { ParticipateTopicCommand } from './commands';

@Injectable()
export class ParticipateTopicUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly topicService: TopicService,
    private readonly optionService: OptionService,
    private readonly historyService: HistoryService,
  ) {}

  async execute(command: ParticipateTopicCommand) {
    await this.userService.findByIdOrThrow(command.userId);

    await this.topicService.findByIdOrThrow(command.topicId);
    await this.optionService.findByIdAndTopicIdOrThrow(command.optionId, command.topicId);

    await this.historyService.throwIfExistsByUserIdAndTopicId(command.userId, command.topicId);
    await this.historyService.insert(command.userId, command.topicId, command.optionId);

    // TODO produce Queue
  }
}
