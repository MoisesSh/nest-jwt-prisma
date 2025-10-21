import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersRoleDto } from './create-users-role.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateUsersRoleDto extends PartialType(CreateUsersRoleDto) {
  @IsNumber()
  @IsNotEmpty()
  role_Id: number;
  @IsNumber()
  @IsNotEmpty()
  user_Id: number;
}
