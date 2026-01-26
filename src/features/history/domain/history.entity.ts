import { OptionEntity, TopicEntity } from '@features/topic/domain';
import { UserEntity } from '@features/user/domain';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

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

  @Column({ type: 'bigint', nullable: true })
  optionId: string | null;

  @Column({ type: 'boolean', default: false })
  isCounted: boolean;

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
