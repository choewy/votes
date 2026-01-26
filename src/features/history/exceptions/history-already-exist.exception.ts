import { HttpStatus } from '@nestjs/common';

import { DomainException } from '@core/exceptions';

export class HistoryAlreadyExistException extends DomainException {
  constructor(
    public readonly userId: string,
    public readonly topicId: string,
  ) {
    super('HISTORY_ALREADY_EXIST', HttpStatus.CONFLICT, 'History already exist', { userId, topicId });
  }
}
