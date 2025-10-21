import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(12)
  name: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(12)
  lastname: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(12)
  passwordHash: string;
}
