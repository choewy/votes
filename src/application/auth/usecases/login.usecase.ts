import { Injectable } from '@nestjs/common';

import { InvalidEmailOrPasswordException } from '@features/auth/exceptions';
import { AuthService } from '@features/auth/services';
import { UserService } from '@features/user/services';

import { LoginCommand } from './commands';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async execute(command: LoginCommand) {
    const user = await this.userService.findByEmail(command.email);

    if (!user) {
      throw new InvalidEmailOrPasswordException();
    }

    return this.authService.issueToken(user);
  }
}
