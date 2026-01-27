import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { OptionService, TopicService } from '@libs/features';

import { CreateTopicCommand } from '../commands';

@Injectable()
export class CreateTopicUseCase {
  constructor(
    private readonly dataSource: DataSource,
    private readonly topicService: TopicService,
    private readonly optionService: OptionService,
  ) {}

  async execute(command: CreateTopicCommand) {
    return this.dataSource.transaction(async (em) => {
      const topic = await this.topicService.insert(command.title, em);
      await this.optionService.insertBulk(topic.id, command.options, em);

      return this.topicService.findByIdWithOptionsOrThrow(topic.id, em);
    });
  }
}
