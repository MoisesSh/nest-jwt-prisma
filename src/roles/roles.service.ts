import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma.service';
import { buildResponse } from 'src/common/response.helper';
@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}
  async create(createRoleDto: CreateRoleDto) {
    try {
      const role = await this.prisma.role.create({
        data: {
          name_role: createRoleDto.name_role,
        },
      });
      return buildResponse('Rol Creado Exitosamente', HttpStatus.CREATED, role);
    } catch (error) {
      throw new HttpException('Error Al Crear EL Rol', HttpStatus.BAD_GATEWAY);
    }
  }
  async findAll() {
    try {
      const allRoles = await this.prisma.role.findMany();
      if (allRoles.length === 0) {
        return buildResponse('No se encontraron roles', HttpStatus.NOT_FOUND);
      }
      return buildResponse('Roles encontrados', HttpStatus.OK, allRoles);
    } catch (error) {
      throw new HttpException(
        'Ocurrio un error al buscar los roles',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const role = await this.prisma.role.findFirst({
        where: {
          role_Id: id,
        },
      });
      if (!role) {
        return buildResponse('No se encontraron roles', HttpStatus.NOT_FOUND);
      }
      return buildResponse('Roles encontrados', HttpStatus.OK, role);
    } catch (error) {
      throw new HttpException(
        'Ocurrio un error al buscar los role',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      const role = await this.prisma.role.findFirst({
        where: {
          role_Id: id,
        },
      });
      if (!role) {
        return buildResponse('No se encontro el rol', HttpStatus.NOT_FOUND);
      }
      const updatedRole = await this.prisma.role.update({
        where: {
          role_Id: id,
        },
        data: {
          name_role: updateRoleDto.name_role,
        },
      });
      return buildResponse('Rol Actualizado', HttpStatus.OK, updatedRole);
    } catch {
      throw new HttpException(
        'Ocurrio un error al acualizar el rol',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const role = await this.prisma.role.findFirst({
        where: {
          role_Id: id,
        },
      });
      if (!role) {
        return buildResponse('No se encontro el rol', HttpStatus.NOT_FOUND);
      }
      const removeRole = await this.prisma.role.delete({
        where: {
          role_Id: id,
        },
      });
      return buildResponse('Rol Eliminado', HttpStatus.OK, removeRole);
    } catch {
      throw new HttpException(
        'Ocurrio un error al eliminar el rol',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
