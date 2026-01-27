import { Controller } from '@nestjs/common';

import { LoginUseCase, RegisterUseCase } from '@application/auth/usecases';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
  ) {}
}
