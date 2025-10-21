import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { UserDepartmentService } from './user-department.service';
import { CreateUserDepartmentDto } from './dto/create-user-department.dto';
import { UpdateUserDepartmentDto } from './dto/update-user-department.dto';
import { AuthGuard } from 'src/auth/guard/guard.guard';

@Controller('user-department')
export class UserDepartmentController {
  constructor(private readonly userDepartmentService: UserDepartmentService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createUserDepartmentDto: CreateUserDepartmentDto) {
    return this.userDepartmentService.create(createUserDepartmentDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.userDepartmentService.findAll();
  }

  @Get(':department_Id/:user_Id')
  @UseGuards(AuthGuard)
  findOne(
    @Param('department_Id', ParseIntPipe) department_Id: number,
    @Param('user_Id', ParseIntPipe) user_Id: number,
  ) {
    return this.userDepartmentService.findOne(department_Id, user_Id);
  }

  @Patch(':department_Id/:user_Id')
  update(@Body() updateUserDepartmentDto: UpdateUserDepartmentDto) {
    return this.userDepartmentService.update(updateUserDepartmentDto);
  }

  @Delete(':department_Id/:user_Id')
  remove(
    @Param('department_Id', ParseIntPipe) department_Id: number,
    @Param('user_Id', ParseIntPipe) user_Id: number,
  ) {
    return this.userDepartmentService.remove(department_Id, user_Id);
  }
}
