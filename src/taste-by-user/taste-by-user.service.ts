import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTasteByUserDto } from './dto/create-taste-by-user.dto';
import { UpdateTasteByUserDto } from './dto/update-taste-by-user.dto';
import { PrismaService } from 'src/prisma.service';
import { buildResponse } from 'src/common/response.helper';

@Injectable()
export class TasteByUserService {
  constructor(private prisma: PrismaService){}
  
  async create(createTasteByUserDto: CreateTasteByUserDto) {
    try { 
      const tasteByUser = await this.prisma.taste_Users.create({
        data: {
          ...createTasteByUserDto
        }
      })
      if (!tasteByUser || tasteByUser === undefined || tasteByUser === null){
        return buildResponse("Error al crear el gusto",HttpStatus.BAD_REQUEST)
      }
      return buildResponse("Gusto creado con éxito",HttpStatus.ACCEPTED,tasteByUser)

    } catch {
      return buildResponse("Error al actualizar el gusto",HttpStatus.INTERNAL_SERVER_ERROR)

    }
  }

  async update(id: number, updateTasteByUserDto: UpdateTasteByUserDto) {
    try { 
      const tasteByUser = await this.prisma.taste_Users.update({
        where: {
          taste_user_id: id
        },
        data: {
          ...updateTasteByUserDto
        }
      })
      if (!tasteByUser || tasteByUser === undefined || tasteByUser === null){
        return buildResponse("Error al actualizar el gusto",HttpStatus.BAD_REQUEST)
      }
      return buildResponse("Gusto actualizado con éxito",HttpStatus.ACCEPTED,tasteByUser)
    } catch {
      return buildResponse("Error al actualizar el gusto",HttpStatus.INTERNAL_SERVER_ERROR)

    }
  }

  async remove(id: number) {
    try { 
      const tasteByUser = await this.prisma.taste_Users.delete({
        where: {
          taste_user_id: id
        }
      })
      if (!tasteByUser || tasteByUser === undefined || tasteByUser === null){
        return buildResponse("Error al remover el gusto",HttpStatus.BAD_REQUEST)
      }
      return buildResponse("Gusto eliminado con éxito",HttpStatus.ACCEPTED,tasteByUser)
      
    } catch {
      return buildResponse("Error al remover el gusto",HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
