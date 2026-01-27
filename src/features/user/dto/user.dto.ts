import { UserEntity } from '../domain';

export class UserDTO {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(e: UserEntity) {
    this.id = e.id;
    this.email = e.email;
    this.createdAt = e.createdAt;
    this.updatedAt = e.updatedAt;
  }
}
