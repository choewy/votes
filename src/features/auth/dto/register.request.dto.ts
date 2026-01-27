import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

export class RegisterRequestDTO {
  @ApiProperty({ type: String, format: 'email' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ type: String })
  @Length(2, 20)
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ type: String, format: 'password' })
  @MinLength(6)
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ type: String, format: 'password' })
  @MinLength(6)
  @IsNotEmpty()
  readonly confirmPassword: string;
}
