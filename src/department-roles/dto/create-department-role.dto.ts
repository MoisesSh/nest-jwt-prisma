import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDepartmentRoleDto {
  @IsNumber()
  @IsNotEmpty()
  role_Id: number;
  @IsNumber()
  @IsNotEmpty()
  department_Id: number;
}
