import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity({ name: UserEntity.NAME })
@Unique('USER_EMAIL_UNIQUE_KEY', ['email'])
export class UserEntity {
  public static readonly NAME = 'user';

  @PrimaryGeneratedColumn({ type: 'bigint', primaryKeyConstraintName: 'USER_PK' })
  readonly id: string;

  @Column({ type: 'varchar', length: 340 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @CreateDateColumn({ type: 'timestamptz' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updatedAt: Date;
}
