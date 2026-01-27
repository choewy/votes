import { HttpStatus } from '@nestjs/common';

import { DomainException } from '@libs/core';

export class TopicNotFoundException extends DomainException {
  constructor(public readonly topicId: string) {
    super('TOPIC_NOT_FOUND', HttpStatus.NOT_FOUND, 'Topic not found', { topicId });
  }
}
