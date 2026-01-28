import { HttpStatus } from '@nestjs/common';

import { DomainException } from '@libs/core';

export class TopicNotEditableException extends DomainException {
  constructor(public readonly topicId: string) {
    super('TOPIC_NOT_EDITABLE', HttpStatus.CONFLICT, 'Topic not editable', { topicId });
  }
}
