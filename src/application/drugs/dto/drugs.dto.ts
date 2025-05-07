import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class DrugDto {
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;
}
