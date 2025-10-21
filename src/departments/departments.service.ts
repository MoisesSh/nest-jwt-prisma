import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PrismaService } from 'src/prisma.service';
import { buildResponse } from 'src/common/response.helper';
import { Departments } from 'generated/prisma';
import { ApiResponse } from 'src/common/api.reponse';

@Injectable()
export class DepartmentsService {
  constructor(private prisma: PrismaService) {}
  async create(
    createDepartmentDto: CreateDepartmentDto,
  ): Promise<ApiResponse<Departments>> {
    try {
      const deparment = await this.prisma.departments.create({
        data: {
          name_department: createDepartmentDto.name_department,
        },
      });
      return buildResponse(
        'Departamento creado correctamente',
        HttpStatus.CREATED,
        deparment,
      );
    } catch (error) {
      throw new HttpException(
        'Error al crear el departamento',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async findAll(): Promise<ApiResponse<Departments[]>> {
    const allDeparments = await this.prisma.departments.findMany();
    if (allDeparments.length === 0) {
      return buildResponse(
        'Departamentos no encontrados',
        HttpStatus.NOT_FOUND,
        [],
      );
    }
    return buildResponse(
      'Departamentos Encontrados',
      HttpStatus.ACCEPTED,
      allDeparments,
    );
  }

  async findOne(id: number): Promise<ApiResponse<Departments>> {
    const deparment = await this.prisma.departments.findFirst({
      where: {
        department_Id: id,
      },
    });
    if (!deparment) {
      throw new HttpException(
        'Departamento no encontrado',
        HttpStatus.NOT_FOUND,
      );
    }
    return buildResponse(
      'Departamentos Encontrados',
      HttpStatus.ACCEPTED,
      deparment,
    );
  }

  async update(
    id: number,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<ApiResponse<Departments>> {
    try {
      const deparment = await this.prisma.departments.update({
        where: {
          department_Id: id,
        },
        data: {
          name_department: updateDepartmentDto.name_department,
        },
      });
      return buildResponse(
        'Departamento Actualizado Correctamente',
        HttpStatus.ACCEPTED,
        deparment,
      );
    } catch {
      throw new HttpException(
        'Error al actualizar el departamento',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number): Promise<ApiResponse<Departments>> {
    try {
      const deparment = await this.prisma.departments.delete({
        where: {
          department_Id: id,
        },
      });
      return buildResponse(
        'Departamento Removido Exitosamente',
        HttpStatus.ACCEPTED,
        deparment,
      );
    } catch {
      throw new HttpException(
        'Error al eliminar el departamento',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
