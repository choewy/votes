import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity({ name: UserEntity.NAME })
@Unique('USER_USERNAME_UNIQUE_KEY', ['username'])
export class UserEntity {
  public static readonly NAME = 'user';

  @PrimaryGeneratedColumn({ type: 'bigint', primaryKeyConstraintName: 'USER_PK' })
  readonly id: string;

  @Column({ type: 'varchar', length: 30 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @CreateDateColumn({ type: 'timestamptz' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updatedAt: Date;
}
