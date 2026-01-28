import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { UserEntity } from '../user';

import { OptionEntity } from './option.entity';

@Entity({ name: TopicEntity.NAME })
export class TopicEntity {
  public static readonly NAME = 'topic';

  @PrimaryGeneratedColumn({ type: 'bigint', primaryKeyConstraintName: 'TOPIC_PK' })
  readonly id: string;

  @Column({ type: 'int', unsigned: true, default: 0 })
  total: number;

  @Column({ type: 'varchar', length: 500 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn({ type: 'timestamptz' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updatedAt: Date;

  @Column({ type: 'bigint' })
  userId: string;

  @ManyToOne(() => UserEntity, (e) => e.topics, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: 'TOPIC_USER_FK' })
  user: UserEntity;

  @OneToMany(() => OptionEntity, (e) => e.topic, { cascade: true })
  options: OptionEntity[];
}
