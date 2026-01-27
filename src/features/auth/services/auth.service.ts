import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import crypto from 'node:crypto';
import { UserEntity } from '@features/user/domain';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';

import { TokenResponseDTO } from '../dto';
import { JwtPayload } from '../strategies';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  private issueRefreshToken() {
    return crypto.createHash('sha256').update(v4()).digest('hex');
  }

  issueToken(user: UserEntity) {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
    };

    return new TokenResponseDTO(this.jwtService.sign(payload), this.issueRefreshToken());
  }

  hashPassword(password: string) {
    return bcrypt.hashSync(password, 10);
  }
}
