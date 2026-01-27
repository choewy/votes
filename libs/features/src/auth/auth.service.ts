import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';

import { UserEntity } from '@libs/domain';

import { JwtPayload } from './strategies';

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

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.issueRefreshToken(),
    };
  }

  hashPassword(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword);
  }
}
