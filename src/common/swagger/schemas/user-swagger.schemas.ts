import { ApiProperty } from '@nestjs/swagger';

export class UserSWSchema {
  @ApiProperty({ example: '408b172b-5976-48d5-bdb2-e7617ad8b7ac' })
  id: string;

  @ApiProperty({ example: 'Black Widow 3' })
  name: string;

  @ApiProperty({ example: 'black.widow@gmail.com' })
  email: string;

  @ApiProperty({ example: 'admin' })
  role: string;

  @ApiProperty({ example: '2025-05-08T01:40:33.991Z' })
  created_at: string;
}
