import { Injectable } from '@nestjs/common';

import { AuthService } from '@features/auth/services';
import { UserService } from '@features/user/services';

import { RegisterCommand } from './commands';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async execute(command: RegisterCommand) {
    await this.userService.throwIfHasByEmail(command.email);
    const user = await this.userService.insert(command.email, command.name, this.authService.hashPassword(command.password));

    return this.authService.issueToken(user);
  }
}
