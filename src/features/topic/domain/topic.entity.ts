import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { OptionEntity } from './option.entity';

@Entity({ name: TopicEntity.NAME })
export class TopicEntity {
  public static readonly NAME = 'topic';

  @PrimaryGeneratedColumn({ type: 'bigint', primaryKeyConstraintName: 'TOPIC_PK' })
  readonly id: string;

  @Column({ type: 'varchar', length: 500 })
  title: string;

  @CreateDateColumn({ type: 'timestamptz' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updatedAt: Date;

  @OneToMany(() => OptionEntity, (e) => e.topic, { cascade: true })
  options: OptionEntity[];
}
