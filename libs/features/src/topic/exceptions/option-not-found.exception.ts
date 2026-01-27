import { HttpStatus } from '@nestjs/common';

import { DomainException } from '@libs/core';

export class OptionNotFoundException extends DomainException {
  constructor(
    public readonly optionId: string,
    public readonly topicId?: string,
  ) {
    super('TOPIC_OPTION_NOT_FOUND', HttpStatus.NOT_FOUND, 'Topic option not found', { topicId, optionId });
  }
}
