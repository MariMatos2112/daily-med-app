import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class DrugDto {
  @IsUUID()
  @ApiProperty({ example: '595f437d-2729-40bb-9c62-c8ece1f82780' })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'DUPIXENT' })
  title: string;
}
