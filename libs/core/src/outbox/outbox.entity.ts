import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { OutboxEventType, OutboxStatus } from './enums';

@Entity({ name: 'outbox' })
@Index('OUTBOX_EVENT_TYPE_IDX', ['eventType'])
@Index('OUTBOX_PENDING_CREATED_AT_IDX', ['createdAt'], {
  where: `"status" = 'PENDING'`,
})
@Index('OUTBOX_PROCESSING_LOCKED_UNTIL_IDX', ['lockedUntil'], {
  where: `"status" = 'PROCESSING' AND "locked_until" IS NOT NULL`,
})
@Index('OUTBOX_PUBLISHED_CREATED_AT_IDX', ['createdAt'], {
  where: `"status" = 'PUBLISHED'`,
})
@Index('OUTBOX_PROCESSING_LOCKED_BY_CREATED_AT_IDX', ['lockedBy', 'createdAt'], {
  where: `"status" = 'PROCESSING'`,
})
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

  @Column({ type: 'timestamptz', nullable: true })
  lockedUntil: Date | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lockedBy: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updatedAt: Date;
}
