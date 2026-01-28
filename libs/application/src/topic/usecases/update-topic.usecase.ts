import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { OptionService, TopicModificationForbiddenException, TopicNotEditableException, TopicService } from '@libs/features';

import { UpdateTopicCommand } from '../commands';

@Injectable()
export class UpdateTopicUseCase {
  constructor(
    private readonly dataSource: DataSource,
    private readonly topicService: TopicService,
    private readonly optionService: OptionService,
  ) {}

  async execute(command: UpdateTopicCommand) {
    return this.dataSource.transaction(async (em) => {
      const topic = await this.topicService.findByIdOrThrow(command.topicId, em, true);

      if (topic.userId !== command.userId) {
        throw new TopicModificationForbiddenException(command.topicId);
      }

      if (topic.total > 0) {
        throw new TopicNotEditableException(command.topicId);
      }

      await this.topicService.update(command.topicId, command.title, command.content, em);
      await this.optionService.reset(topic.id, command.options, em);

      return this.topicService.findByIdWithOptionsOrThrow(topic.id, em);
    });
  }
}
