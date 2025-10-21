import { PartialType } from '@nestjs/mapped-types';
import { CreateDepartmentRoleDto } from './create-department-role.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateDepartmentRoleDto extends PartialType(
  CreateDepartmentRoleDto,
) {
  @IsNotEmpty()
  @IsNumber()
  department_Id: number;
  @IsNotEmpty()
  @IsNumber()
  role_Id: number;
}
