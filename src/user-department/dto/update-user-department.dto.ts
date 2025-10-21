import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDepartmentDto } from './create-user-department.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateUserDepartmentDto extends PartialType(
  CreateUserDepartmentDto,
) {
  @IsNumber()
  @IsNotEmpty()
  department_Id: number;
  @IsNumber()
  @IsNotEmpty()
  user_Id: number;
}
