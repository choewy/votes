import { UserEntity } from '../domain';

export class UserDTO {
  id: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(e: UserEntity) {
    this.id = e.id;
    this.username = e.username;
    this.createdAt = e.createdAt;
    this.updatedAt = e.updatedAt;
  }
}
