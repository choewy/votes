import { Injectable } from '@nestjs/common';

import { AuthService, UserService } from '@libs/features';

import { RegisterCommand } from '../commands';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async execute(command: RegisterCommand) {
    await this.userService.throwIfHasByEmail(command.email);

    const hashedPassword = this.authService.hashPassword(command.password);
    const user = await this.userService.insert(command.email, command.name, hashedPassword);

    return this.authService.issueToken(user);
  }
}
