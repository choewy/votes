import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-jwt';

import { Configuration } from '@libs/core';

import { InvalidTokenException } from '../exceptions';

import { JwtPayload, JwtRequestUser } from './types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(protected readonly configuration: Configuration) {
    super(configuration.passportJwtStrategyOptions);
  }

  validate(payload: JwtPayload): JwtRequestUser {
    if (!payload?.id) {
      throw new InvalidTokenException();
    }

    return { id: payload.id, email: payload.email };
  }
}
