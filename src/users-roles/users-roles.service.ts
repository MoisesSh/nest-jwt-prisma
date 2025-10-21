import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsersRoleDto } from './dto/create-users-role.dto';
import { UpdateUsersRoleDto } from './dto/update-users-role.dto';
import { buildResponse } from 'src/common/response.helper';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersRolesService {
  constructor(private prisma: PrismaService) {}
  async create(createUsersRoleDto: CreateUsersRoleDto) {
    try {
      const userDepartment = await this.prisma.role_Users.create({
        data: {
          role_Id: createUsersRoleDto.role_Id,
          user_Id: createUsersRoleDto.user_Id,
        },
      });
      return buildResponse(
        'Rol asignado correctamente',
        HttpStatus.CREATED,
        userDepartment,
      );
    } catch {
      throw new HttpException(
        'Ocurrio un error al asingnar el rol al usuario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const rol = await this.prisma.role_Users.findMany();

      if (!rol) {
        return buildResponse(
          'No se encontro el rol del usuario',
          HttpStatus.NOT_FOUND,
        );
      }
      return buildResponse('Rol del usuario encontrado', HttpStatus.OK, rol);
    } catch {
      throw new HttpException(
        'Ocurrio un error al buscar el rol del usuario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(role_Id: number, user_Id: number) {
    try {
      const rol = await this.prisma.role_Users.findFirst({
        where: {
          role_Id: role_Id,
          user_Id: user_Id,
        },
      });
      if (!rol) {
        return buildResponse('No se encontro el rol', HttpStatus.NOT_FOUND);
      }
      return buildResponse('rol del usuario encontrado', HttpStatus.OK, rol);
    } catch {
      throw new HttpException(
        'Ocurrio un error al buscar el rol del usuario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(updateUserDepartmentDto: UpdateUsersRoleDto) {
    try {
      const rol = await this.prisma.role_Users.findFirst({
        where: {
          ...updateUserDepartmentDto,
        },
      });
      if (!rol) {
        return buildResponse(
          'No se encontro el rol del usuario',
          HttpStatus.NOT_FOUND,
        );
      }
      const rolUpdate = await this.prisma.role_Users.update({
        where: {
          ...rol,
        },
        data: {
          ...updateUserDepartmentDto,
        },
      });
      return buildResponse(
        'Rol del usuario actualizado correctamente',
        HttpStatus.OK,
        rolUpdate,
      );
    } catch {
      throw new HttpException(
        'Ocurrio un error al actualizar el rol del usuario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(role_Id: number, user_Id: number) {
    try {
      const removeRole = await this.prisma.role_Users.findFirst({
        where: {
          role_Id: role_Id,
          user_Id: user_Id,
        },
      });
      if (!removeRole) {
        return buildResponse(
          'No se encontro eel departamento',
          HttpStatus.NOT_FOUND,
        );
      }
      return buildResponse(
        'Departamento encontrado',
        HttpStatus.OK,
        removeRole,
      );
    } catch {
      throw new HttpException(
        'Ocurrio un error al buscar el departamento',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
