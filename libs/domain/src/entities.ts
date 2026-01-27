import { OutboxEntity } from '@libs/core';

import { HistoryEntity } from './history';
import { OptionEntity, TopicEntity } from './topic';
import { UserEntity } from './user';

export const ENTITIES = [UserEntity, TopicEntity, HistoryEntity, OptionEntity, OutboxEntity];
