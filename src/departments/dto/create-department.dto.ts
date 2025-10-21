import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name_department: string;
}
