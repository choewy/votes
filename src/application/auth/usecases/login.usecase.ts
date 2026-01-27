import { Injectable } from '@nestjs/common';

import { AuthService } from '@features/auth/services';
import { UserService } from '@features/user/services';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
}
