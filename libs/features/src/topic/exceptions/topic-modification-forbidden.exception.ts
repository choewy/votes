import { HttpStatus } from '@nestjs/common';

import { DomainException } from '@libs/core';

export class TopicModificationForbiddenException extends DomainException {
  constructor(public readonly topicId: string) {
    super('TOPIC_MODIFICATION_FORBIDDEN', HttpStatus.FORBIDDEN, 'Topic modification forbidden', { topicId });
  }
}
