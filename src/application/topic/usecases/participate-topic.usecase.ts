import { Injectable } from '@nestjs/common';

import { OutboxEventType } from '@core/outbox';
import { OutboxService } from '@core/outbox/outbox.service';
import { HistoryService } from '@features/history/services';
import { OptionService, TopicService } from '@features/topic/services';
import { UserService } from '@features/user/services';
import { DataSource } from 'typeorm';

import { ParticipateTopicCommand } from './commands';

@Injectable()
export class ParticipateTopicUseCase {
  constructor(
    private readonly dataSource: DataSource,
    private readonly userService: UserService,
    private readonly topicService: TopicService,
    private readonly optionService: OptionService,
    private readonly historyService: HistoryService,
    private readonly outboxService: OutboxService,
  ) {}

  async execute(command: ParticipateTopicCommand) {
    await this.userService.findByIdOrThrow(command.userId);
    await this.topicService.findByIdOrThrow(command.topicId);
    await this.optionService.findByIdAndTopicIdOrThrow(command.optionId, command.topicId);

    await this.dataSource.transaction(async (em) => {
      await this.historyService.throwIfExistsByUserIdAndTopicId(command.userId, command.topicId, em);
      const history = await this.historyService.insert(command.userId, command.topicId, command.optionId, em);
      await this.outboxService.enqueue(
        OutboxEventType.TOPIC_PARTICIPATED,
        {
          historyId: history.id,
          userId: command.userId,
          topicId: command.topicId,
          optionId: command.optionId,
        },
        em,
      );
    });
  }
}
