import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, Length, IsNotEmpty } from 'class-validator';

export class IndicationDto {
  @IsUUID()
  @ApiProperty({ example: '595f437d-2729-40bb-9c62-c8ece1f82780' })
  drug_id: string;

  @IsString()
  @Length(1, 10)
  @ApiProperty({ example: 'L20.89' })
  icd_10_code: string;

  @IsString()
  @Length(1, 120)
  @ApiProperty({ example: 'Asthma' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'DUPIXENT is indicated for the treatment of...' })
  description: string;
}
