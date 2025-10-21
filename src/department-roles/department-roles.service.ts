import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDepartmentRoleDto } from './dto/create-department-role.dto';
import {} from './dto/update-department-role.dto';
import { PrismaService } from 'src/prisma.service';
import { Role_Departments } from 'generated/prisma';
import { ApiResponse } from 'src/common/api.reponse';
import { buildResponse } from 'src/common/response.helper';

@Injectable()
export class DepartmentRolesService {
  constructor(private prisma: PrismaService) {}
  async create(
    createDepartmentRoleDto: CreateDepartmentRoleDto,
  ): Promise<ApiResponse<Role_Departments>> {
    try {
      const assignRole = await this.prisma.role_Departments.create({
        data: {
          department_Id: createDepartmentRoleDto.department_Id,
          role_Id: createDepartmentRoleDto.role_Id,
        },
      });
      return buildResponse(
        'Rol Asigado al departamento correctamente',
        HttpStatus.ACCEPTED,
        assignRole,
      );
    } catch {
      throw new HttpException(
        'Error al asignar el rol al departamento',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<ApiResponse<Role_Departments[]>> {
    const allDeparmentsWithRoles =
      await this.prisma.role_Departments.findMany();
    if (allDeparmentsWithRoles.length === 0) {
      throw new HttpException(
        'No se encontraron departamentos con roles',
        HttpStatus.NOT_FOUND,
      );
    }
    return buildResponse(
      'Departamentos con roles encontrados',
      HttpStatus.OK,
      allDeparmentsWithRoles,
    );
  }

  async findOne(
    deparment_id: number,
    role_id: number,
  ): Promise<ApiResponse<Role_Departments>> {
    const deparmentsWithRole = await this.prisma.role_Departments.findFirst({
      where: {
        department_Id: deparment_id,
        role_Id: role_id,
      },
      include: {
        departmentRole: true,
        roledepartments: true,
      },
    });
    if (!deparmentsWithRole) {
      throw new HttpException(
        'No se encontro el departamento con el rol asignado',
        HttpStatus.NOT_FOUND,
      );
    }
    return buildResponse(
      'Departamentos con roles encontrados',
      HttpStatus.OK,
      deparmentsWithRole,
    );
  }

  async update(
    deparment_Id: number,
    role_Id: number,
  ): Promise<ApiResponse<Role_Departments>> {
    const deparmentsWithRole = await this.prisma.role_Departments.update({
      where: {
        role_Id_department_Id: {
          department_Id: deparment_Id,
          role_Id: role_Id,
        },
      },
      data: {
        department_Id: deparment_Id,
        role_Id: role_Id,
      },
      include: {
        departmentRole: true,
        roledepartments: true,
      },
    });
    if (!deparmentsWithRole) {
      throw new HttpException(
        'No se pudo actualizar el rol del departamento',
        HttpStatus.NOT_FOUND,
      );
    }
    return buildResponse(
      'Rol actualizado del departamento',
      HttpStatus.OK,
      deparmentsWithRole,
    );
  }

  async remove(department_Id: number, role_Id: number) {
    const removeRole = await this.prisma.role_Departments.delete({
      where: {
        role_Id_department_Id: {
          department_Id: department_Id,
          role_Id: role_Id,
        },
      },
    });
    if (!removeRole) {
      throw new HttpException(
        'No se pudo Eliminar el rol del departamento',
        HttpStatus.NOT_FOUND,
      );
    }
    return buildResponse(
      'Rol Eliminado del departamento',
      HttpStatus.OK,
      removeRole,
    );
  }
}
