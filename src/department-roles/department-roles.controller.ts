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

  @Get(':id')
  findOne(
    @Param('deparment_id', ParseIntPipe) deparment_id: number,
    @Param('role_id', ParseIntPipe) role_id: number,
  ) {
    return this.departmentRolesService.findOne(deparment_id, role_id);
  }

  @Patch(':id')
  update(
    @Param('deparment_id', ParseIntPipe) deparment_id: number,
    @Param('role_id', ParseIntPipe) role_id: number,
  ) {
    return this.departmentRolesService.update(deparment_id, role_id);
  }
  @Delete(':id')
  remove(
    @Param('deparment_id', ParseIntPipe) deparment_id: number,
    @Param('role_id', ParseIntPipe) role_id: number,
  ) {
    return this.departmentRolesService.remove(deparment_id, role_id);
  }
}
