import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { TopicEntity } from './topic.entity';

@Entity({ name: OptionEntity.NAME })
export class OptionEntity {
  public static readonly NAME = 'option';

  @PrimaryGeneratedColumn({ type: 'bigint', primaryKeyConstraintName: 'OPTION_PK' })
  readonly id: string;

  @Column({ type: 'varchar', length: 50 })
  value: string;

  @Column({ type: 'int', unsigned: true, default: 0 })
  count: number;

  @CreateDateColumn({ type: 'timestamptz' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updatedAt: Date;

  @Column({ type: 'bigint' })
  topicId: string;

  @ManyToOne(() => TopicEntity, (e) => e.options, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: 'OPTION_TOPIC_FK' })
  topic: TopicEntity;
}
