import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';

export class UserResponseDTO {
  @ApiProperty({ type: String })
  @Expose()
  id: string;

  @ApiProperty({ type: String, format: 'email' })
  @Expose()
  email: string;

  @ApiProperty({ type: String })
  @Expose()
  name: string;

  @ApiProperty({ type: Date })
  @Expose()
  createdAt: Date;

  @ApiProperty({ type: Date })
  @Expose()
  updatedAt: Date;
}
