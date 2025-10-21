import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDepartmentDto } from './dto/create-user-department.dto';
import { UpdateUserDepartmentDto } from './dto/update-user-department.dto';
import { PrismaService } from 'src/prisma.service';
import { buildResponse } from 'src/common/response.helper';

@Injectable()
export class UserDepartmentService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDepartmentDto: CreateUserDepartmentDto) {
    try {
      const userDepartment = await this.prisma.departments_Users.create({
        data: {
          department_Id: createUserDepartmentDto.department_Id,
          user_Id: createUserDepartmentDto.user_Id,
        },
      });
      return buildResponse(
        'Departamento asignado correctamente',
        HttpStatus.CREATED,
        userDepartment,
      );
    } catch {
      throw new HttpException(
        'Ocurrio un error al asingnar el departamento',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const departments = await this.prisma.departments_Users.findMany();

      if (!departments) {
        return buildResponse(
          'No se encontro eel departamento',
          HttpStatus.NOT_FOUND,
        );
      }
      return buildResponse(
        'Departamento encontrado',
        HttpStatus.OK,
        departments,
      );
    } catch {
      throw new HttpException(
        'Ocurrio un error al buscar los departamentos de los usuarios',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(department_Id: number, user_Id: number) {
    try {
      const department = await this.prisma.departments_Users.findFirst({
        where: {
          department_Id: department_Id,
          user_Id: user_Id,
        },
      });
      if (!department) {
        return buildResponse(
          'No se encontro el departamento del usuario',
          HttpStatus.NOT_FOUND,
        );
      }
      return buildResponse(
        'Departamento encontrado',
        HttpStatus.OK,
        department,
      );
    } catch {
      throw new HttpException(
        'Ocurrio un error al buscar el departamento del usuario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(updateUserDepartmentDto: UpdateUserDepartmentDto) {
    try {
      const department = await this.prisma.departments_Users.findFirst({
        where: {
          department_Id: updateUserDepartmentDto.department_Id,
          user_Id: updateUserDepartmentDto.user_Id,
        },
      });
      if (!department) {
        return buildResponse(
          'No se encontro el departamento del usuario',
          HttpStatus.NOT_FOUND,
        );
      }
      const departmentUpdated = await this.prisma.departments_Users.update({
        where: { ...department },
        data: {
          ...updateUserDepartmentDto,
        },
      });
      return buildResponse(
        'Departamento actualizado correctamente del usuario',
        HttpStatus.OK,
        departmentUpdated,
      );
    } catch {
      throw new HttpException(
        'Ocurrio un error al actualizar el departamento del usuario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(department_Id: number, user_Id: number) {
    try {
      const department = await this.prisma.departments_Users.findFirst({
        where: {
          department_Id: department_Id,
          user_Id: user_Id,
        },
      });
      if (!department) {
        return buildResponse(
          'No se encontro el departamento del usuario',
          HttpStatus.NOT_FOUND,
        );
      }
      const removeDepartment = await this.prisma.departments_Users.delete({
        where: { ...department },
      });
      return buildResponse(
        'Departamento eliminado correctamente del usuario',
        HttpStatus.OK,
        removeDepartment,
      );
    } catch {
      throw new HttpException(
        'Ocurrio un error al buscar el departamento del usuario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
