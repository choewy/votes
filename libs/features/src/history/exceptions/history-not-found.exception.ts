import { HttpStatus } from '@nestjs/common';

import { DomainException } from '@libs/core';

export class HistoryNotFoundException extends DomainException {
  constructor(
    public readonly historyId?: string,
    public readonly userId?: string,
    public readonly topicId?: string,
  ) {
    super('HISTORY_NOT_FOUND', HttpStatus.NOT_FOUND, 'History not found', { historyId, userId, topicId });
  }
}
