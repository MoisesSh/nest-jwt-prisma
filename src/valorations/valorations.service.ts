import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateValorationDto } from './dto/create-valoration.dto';
import { PrismaService } from 'src/prisma.service';
import { buildResponse } from 'src/common/response.helper';

@Injectable()
export class ValorationsService {
  constructor(private prisma: PrismaService){}
  async create(createValorationDto: CreateValorationDto) {
    try {
      const valoration = await this.prisma.valorations.create({
        data: {
          ...createValorationDto
        }
      })
      if (!valoration || valoration === undefined || valoration === null) {
        return buildResponse("Error al valorar el artista", HttpStatus.BAD_REQUEST)
      }
      return buildResponse("Valoración realizada con éxito", HttpStatus.ACCEPTED, valoration)
    }
    catch {
      return buildResponse("Error al crear la valoración", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  async remove(id: number) {
    try {
      const valoration = await this.prisma.valorations.delete({
        where: {
           valorations_id: id
         }
      })
      if (!valoration || valoration === undefined || valoration === null) {
      return buildResponse("Error al quitar la valoración del artista", HttpStatus.BAD_REQUEST)
      }
      return buildResponse("Valoración quitada con éxito", HttpStatus.ACCEPTED, valoration)
    }
    catch {
      return buildResponse("Error al crear la valoración", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
