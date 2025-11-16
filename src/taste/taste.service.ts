import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTasteDto } from './dto/create-taste.dto';
import { PrismaService } from 'src/prisma.service';
import { buildResponse } from 'src/common/response.helper';

@Injectable()
export class TasteService {
  constructor(private prisma: PrismaService) {}
  async create(createTasteDto: CreateTasteDto) {
    try {
      const taste = await this.prisma.taste.create({
        data: {
          ...createTasteDto
        }
      })
      if (!taste || taste === undefined || taste === null) {
        return buildResponse("Error al crear el gusto", HttpStatus.BAD_REQUEST)
      }
      return buildResponse("Gusto creado con éxito", HttpStatus.ACCEPTED, taste)
    } catch {
      return buildResponse("Error al crear el gusto", HttpStatus.INTERNAL_SERVER_ERROR)
    } 
  }
  async findAll() {
    try {
      const taste = await this.prisma.taste.findMany()
      if (!taste || taste === undefined || taste === null || taste.length === 0) {
        return buildResponse("Error al crear el gusto", HttpStatus.BAD_REQUEST)
      }
      return buildResponse("Listado de gustos", HttpStatus.ACCEPTED, taste)
    } catch {
      return buildResponse("Error al consultar los gustos", HttpStatus.INTERNAL_SERVER_ERROR)
    } 
  }
  
}
