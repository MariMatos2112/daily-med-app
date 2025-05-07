import { IsUUID, IsString, Length, IsNotEmpty } from 'class-validator';

export class IndicationDto {
  @IsUUID()
  drug_id: string;

  @IsString()
  @Length(1, 10)
  icd_10_code: string;

  @IsString()
  @Length(1, 120)
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
