import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { OutboxEventType, OutboxStatus } from './enums';

@Entity({ name: 'outbox' })
@Index('OUTBOX_EVENT_TYPE_IDX', ['eventType'])
@Index('OUTBOX_EVENT_STATUS_IDX', ['status'])
export class OutboxEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'OUTBOX_PK' })
  id: string;

  @Column({ type: 'enum', enum: OutboxEventType })
  eventType: OutboxEventType;

  @Column({ type: 'jsonb' })
  payload: unknown;

  @Column({ type: 'enum', enum: OutboxStatus, default: OutboxStatus.PENDING })
  status: OutboxStatus;

  @Column({ type: 'int', default: 0 })
  attempts: number;

  @Column({ type: 'timestamptz', nullable: true })
  lastAttemptAt: Date | null;

  @Column({ type: 'text', nullable: true })
  lastError: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updatedAt: Date;
}
