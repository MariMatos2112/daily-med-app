import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty({ example: 'captain.america@marvel.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'marvel123' })
  password: string;
}

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Captain America' })
  name: string;

  @IsEmail()
  @ApiProperty({ example: 'captain.america@marvel.com' })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ example: 'marvel123' })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'user' })
  role: string;
}
