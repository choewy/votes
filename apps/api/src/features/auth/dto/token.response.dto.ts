import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';

export class TokenResponseDTO {
  @ApiProperty({ type: String })
  @Expose()
  accessToken: string;

  @ApiProperty({ type: String })
  @Expose()
  refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
