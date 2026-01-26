import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: UserEntity.NAME })
export class UserEntity {
  public static readonly NAME = 'user';

  @PrimaryGeneratedColumn({ type: 'bigint' })
  readonly id: string;

  @CreateDateColumn({ type: 'timestamptz' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updatedAt: Date;
}
