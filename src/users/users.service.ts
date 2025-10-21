import { buildResponse } from 'src/common/response.helper';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from 'generated/prisma';
import * as bcrypt from 'bcryptjs';
import { ApiResponse } from 'src/common/api.reponse';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto): Promise<ApiResponse<User>> {
    try {
      const passHash = await bcrypt.hash(createUserDto.passwordHash, 13);
      const createUser = await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          lastname: createUserDto.lastname,
          passwordHash: passHash,
        },
      });
      return buildResponse('Usuario creado con exito', 201, createUser);
    } catch {
      throw new HttpException(
        'Error al crear el usuario',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
