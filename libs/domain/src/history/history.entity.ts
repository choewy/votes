import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

import { OptionEntity, TopicEntity } from '../topic';
import { UserEntity } from '../user';

@Entity({ name: HistoryEntity.NAME })
@Unique('HISTORY_UNIQUE_KEY', ['userId', 'topicId'])
export class HistoryEntity {
  public static readonly NAME = 'history';

  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'HISTORY_PK' })
  readonly id: string;

  @Column({ type: 'bigint' })
  userId: string;

  @Column({ type: 'bigint' })
  topicId: string;

  @Column({ type: 'bigint' })
  optionId: string;

  @Column({ type: 'boolean', default: false })
  isCounted: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updatedAt: Date;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: 'HISTORY_USER_FK' })
  user: UserEntity;

  @ManyToOne(() => TopicEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: 'HISTORY_TOPIC_FK' })
  topic: TopicEntity;

  @ManyToOne(() => OptionEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: 'HISTORY_OPTION_FK' })
  option: OptionEntity;
}
