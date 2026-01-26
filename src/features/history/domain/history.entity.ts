import { OptionEntity, TopicEntity } from '@features/topic/domain';
import { UserEntity } from '@features/user/domain';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: HistoryEntity.NAME })
export class HistoryEntity {
  public static readonly NAME = 'history';

  @PrimaryColumn({ type: 'bigint', primaryKeyConstraintName: 'HISTORY_PK' })
  userId: string;

  @PrimaryColumn({ type: 'bigint', primaryKeyConstraintName: 'HISTORY_PK' })
  topicId: string;

  @Column({ type: 'bigint', nullable: true })
  optionId: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  readonly createdAt: Date;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: 'HISTORY_USER_FK' })
  user: UserEntity;

  @ManyToOne(() => TopicEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: 'HISTORY_TOPIC_FK' })
  topic: TopicEntity;

  @ManyToOne(() => OptionEntity, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ foreignKeyConstraintName: 'HISTORY_OPTION_FK' })
  option: OptionEntity | null;
}
