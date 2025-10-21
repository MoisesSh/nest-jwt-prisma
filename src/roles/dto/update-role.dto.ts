import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @IsNumber()
  @IsNotEmpty()
  role_id: number;
  @IsString()
  @IsNotEmpty()
  name_role: string;
}
