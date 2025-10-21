import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { DepartmentRolesService } from './department-roles.service';
import { CreateDepartmentRoleDto } from './dto/create-department-role.dto';
import { AuthGuard } from 'src/auth/guard/guard.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags("Department Roles")
@ApiBearerAuth()

@Controller('department-roles')
export class DepartmentRolesController {
  constructor(
    private readonly departmentRolesService: DepartmentRolesService,
  ) {}

  @Post()
  create(@Body() createDepartmentRoleDto: CreateDepartmentRoleDto) {
    return this.departmentRolesService.create(createDepartmentRoleDto);
  }

  @Get()
  findAll() {
    return this.departmentRolesService.findAll();
  }

  @Get(':role_id/:deparment_id')
  findOne(
    @Param('deparment_id', ParseIntPipe) deparment_id: number,
    @Param('role_id', ParseIntPipe) role_id: number,
  ) {
    return this.departmentRolesService.findOne(deparment_id, role_id);
  }

  @Patch(':deparment_id/:role_id_old/:new_role')
  update(
    @Param('deparment_id', ParseIntPipe) deparment_id: number,
    @Param('role_id_old', ParseIntPipe) role_id_old: number,
    @Param('new_role', ParseIntPipe) new_role: number,
  ) {
    return this.departmentRolesService.update(deparment_id, role_id_old,new_role);
  }
  @Delete(':deparment_id/:role_id')
  remove(
    @Param('deparment_id', ParseIntPipe) deparment_id: number,
    @Param('role_id', ParseIntPipe) role_id: number,
  ) {
    return this.departmentRolesService.remove(deparment_id, role_id);
  }
}
