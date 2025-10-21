import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUsersRoleDto {
  @IsNumber()
  @IsNotEmpty()
  role_Id: number;
  @IsNumber()
  @IsNotEmpty()
  user_Id: number;
}
