import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDepartmentDto {
  @IsNumber()
  @IsNotEmpty()
  department_Id: number;
  @IsNumber()
  @IsNotEmpty()
  user_Id: number;
}
