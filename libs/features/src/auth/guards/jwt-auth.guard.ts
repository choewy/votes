import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { ContextService } from '@libs/core';

import { IS_PUBLIC_KEY } from '../decorators';
import { InvalidTokenException } from '../exceptions';
import { JwtRequestUser } from '../strategies';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly contextService: ContextService<JwtRequestUser | null>,
  ) {
    super();
  }

  override canActivate(context: ExecutionContext) {
    this.contextService.context = context;

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);

    if (isPublic) {
      this.contextService.user = null;

      return true;
    }

    return super.canActivate(context);
  }

  override handleRequest<TUser = unknown>(e: unknown, user: TUser) {
    if (e instanceof Error) {
      throw e;
    }

    if (!this.isJwtRequestUser(user)) {
      throw new InvalidTokenException();
    }

    this.contextService.user = user ?? null;

    return user ?? null;
  }

  private isJwtRequestUser(user: unknown): user is JwtRequestUser {
    if (typeof user !== 'object' || user === null) {
      return false;
    }

    const u = user as Record<string, unknown>;

    return typeof u.id === 'string' && typeof u.email === 'string';
  }
}
