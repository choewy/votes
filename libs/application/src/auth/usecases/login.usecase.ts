import { Injectable } from '@nestjs/common';

import { AuthService, InvalidEmailOrPasswordException, UserService } from '@libs/features';

import { LoginCommand } from '../commands';

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

    if (!this.authService.comparePassword(command.password, user.password)) {
      throw new InvalidEmailOrPasswordException();
    }

    return this.authService.issueToken(user);
  }
}
