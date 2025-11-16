import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { buildResponse } from 'src/common/response.helper';
@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService){}
  async create(createArtistDto: CreateArtistDto) {
    try { 
      const artist = await this.prisma.artist.create({
        data: {
          ...createArtistDto
        }
      })

      if (!artist || artist == null || artist == undefined) {
      return buildResponse("Error al crear el artista",HttpStatus.BAD_REQUEST,artist)
      }
      return buildResponse("Artista creado exitosamente",HttpStatus.CREATED,artist)
    } catch {
      return buildResponse("Ocurrio un error al crear el artista",HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll() {
    try {
      const allArtist = await this.prisma.artist.findMany()
      if (!allArtist || allArtist == null || allArtist == undefined) {
        return buildResponse("No se encontraron artistas", HttpStatus.NOT_FOUND)
      }
      return buildResponse("Artistas encontrados", HttpStatus.OK, allArtist)
    }
    catch {
      return buildResponse("Ocurrio un error al buscar los artistas", HttpStatus.INTERNAL_SERVER_ERROR)
    }    
  }
  async findOne(id: number) {
    try {
      const artist = await this.prisma.artist.findUnique({
        where: {
          artist_id: id
        }
      })
      return buildResponse("Artista encontrado", HttpStatus.OK, artist)
    } catch {
      return buildResponse("Ocurrio un error al buscar el artista", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(id: number, updateArtistDto: UpdateArtistDto) {
    try { 
      const artist = await this.prisma.artist.update({
        data: {
          ...updateArtistDto
        },
        where: {
          artist_id: id
        }
      })

      if (!artist || artist == null || artist == undefined) {
      return buildResponse("Error al crear el artista",HttpStatus.BAD_REQUEST,artist)
      }
      return buildResponse("Artista creado exitosamente",HttpStatus.CREATED,artist)
    } catch {
      return buildResponse("Ocurrio un error al crear el artista",HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
