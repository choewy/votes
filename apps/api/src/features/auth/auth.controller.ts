import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';

import { LoginUseCase, RegisterUseCase } from '@libs/application';
import { FieldMatchPipe } from '@libs/core';
import { Public } from '@libs/features';

import { LoginRequestDTO, RegisterRequestDTO, TokenResponseDTO } from './dto';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Post('register')
  @UsePipes(new FieldMatchPipe<RegisterRequestDTO>('password', 'confirmPassword'))
  @ApiCreatedResponse({ type: TokenResponseDTO })
  register(@Body() body: RegisterRequestDTO) {
    return this.registerUseCase.execute({
      email: body.email,
      name: body.name,
      password: body.password,
    });
  }

  @Post('login')
  @ApiCreatedResponse({ type: TokenResponseDTO })
  login(@Body() body: LoginRequestDTO) {
    return this.loginUseCase.execute({
      email: body.email,
      password: body.password,
    });
  }
}
