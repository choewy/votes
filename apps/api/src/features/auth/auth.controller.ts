import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { LoginUseCase, RegisterUseCase } from '@libs/application';
import { FieldMatchPipe } from '@libs/core';
import { Public } from '@libs/features';

import { LoginRequestDTO, RegisterRequestDTO, TokenResponseDTO } from './dto';

@ApiTags('인증')
@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Post('register')
  @UsePipes(new FieldMatchPipe<RegisterRequestDTO>('password', 'confirmPassword'))
  @ApiOperation({ summary: '회원가입', security: [] })
  @ApiCreatedResponse({ type: TokenResponseDTO })
  register(@Body() body: RegisterRequestDTO) {
    return this.registerUseCase.execute({
      email: body.email,
      name: body.name,
      password: body.password,
    });
  }

  @Post('login')
  @ApiOperation({ summary: '로그인', security: [] })
  @ApiCreatedResponse({ type: TokenResponseDTO })
  login(@Body() body: LoginRequestDTO) {
    return this.loginUseCase.execute({
      email: body.email,
      password: body.password,
    });
  }
}
