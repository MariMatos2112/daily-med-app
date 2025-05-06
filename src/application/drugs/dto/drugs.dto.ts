/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class DrugDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;
}
