import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersRolesService } from './users-roles.service';
import { CreateUsersRoleDto } from './dto/create-users-role.dto';
import { UpdateUsersRoleDto } from './dto/update-users-role.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags("Roles by User")
@ApiBearerAuth()

@Controller('users-roles')
export class UsersRolesController {
  constructor(private readonly usersRolesService: UsersRolesService) {}

  @Post()
  create(@Body() createUsersRoleDto: CreateUsersRoleDto) {
    return this.usersRolesService.create(createUsersRoleDto);
  }

  @Get()
  findAll() {
    return this.usersRolesService.findAll();
  }

  @Get(':role_Id/:user_Id')
  findOne(
    @Param('role_Id', ParseIntPipe) role_Id: number,
    @Param('user_Id', ParseIntPipe) user_Id: number,
  ) {
    return this.usersRolesService.findOne(role_Id, user_Id);
  }

  @Patch(':role_Id/:user_Id')
  update(@Body() updateUsersRoleDto: UpdateUsersRoleDto) {
    return this.usersRolesService.update(updateUsersRoleDto);
  }

  @Delete(':role_Id/:user_Id')
  remove(
    @Param('role_Id', ParseIntPipe) role_Id: number,
    @Param('user_Id', ParseIntPipe) user_Id: number,
  ) {
    return this.usersRolesService.remove(role_Id, user_Id);
  }
}
