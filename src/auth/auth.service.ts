import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcryptjs';
import { hashToken } from './token.utils';
import { Request, Response } from 'express';
import { buildResponse } from 'src/common/response.helper';
import { CreateAuthDto, singInAuthDto} from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}
  async singIn(
    singInAuthDto: singInAuthDto,
  ) {
    const { email, password } = singInAuthDto;
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return buildResponse("Usuario no encontrado", HttpStatus.NOT_FOUND)
    }
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new HttpException('Contraseña incorrecta', HttpStatus.UNAUTHORIZED);
    }
    const payload = { name: user.name, email: user.email, id: user.user_Id };
    const token = await this.jwtService.signAsync(payload);
    const tokenHash = hashToken(token);
    await this.prisma.authentication.create({
      data: {
        user_Id: user.user_Id,
        token: tokenHash,
        expiresAt: new Date(Date.now() + 1000 * 60 * 30),
      },
    });
    return {
      status: HttpStatus.OK,
      user: payload,
      access_token: token,
    };
  }

  async singUp(createAuthDto: CreateAuthDto) {
    const { name, lastname, email, password } = createAuthDto;
    const hash = await bcrypt.hash(password, 12);
    const singUpUser = await this.prisma.user.create({
      data: {
        name,
        lastname,
        email,
        passwordHash: hash,
      },
    });
    if (!singUpUser) {
      return buildResponse(
        'Error al crear el usuario',
        HttpStatus.BAD_REQUEST,
      );
    }
    return buildResponse(
      'Usuario Creado Exitosamente',
      HttpStatus.CREATED,
    );;
  }
  async findOne(id: number) {
    const oneUser = await this.prisma.user.findUnique({
      where: { user_Id: id },
    });
    if (!oneUser) {
      return buildResponse('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    return oneUser;
  }
  async refreshToken(request: Request, response: Response,) {
    const [type, getToken] = request.headers.authorization?.split(' ') ?? [];
    if (!type || !getToken) {
      throw new HttpException('No hay token', HttpStatus.UNAUTHORIZED);
    }
    const tokenHash = hashToken(getToken);
    const result = await this.prisma.$transaction(async (tx) => {
      const oldToken = await tx.authentication.findUnique({
        where: {
          token: tokenHash,
        },
        include: {
          authenticationUser: true,
        },
      });
      if (!oldToken) {
        return buildResponse('El token no existe', HttpStatus.NOT_FOUND);
      }
      if (!oldToken.authenticationUser) {
        return buildResponse('Usuario no existe', HttpStatus.NOT_FOUND);
      }
      if (oldToken.revoked) {
        return buildResponse('Token revocado', HttpStatus.UNAUTHORIZED);
      }
      const newPayload = {
        name: oldToken.authenticationUser.name,
        email: oldToken.authenticationUser.email,
        id: oldToken.authenticationUser.user_Id,
        password: oldToken.authenticationUser.passwordHash,
      };
      const newToken = await this.jwtService.signAsync(newPayload);
      const newHash = hashToken(newToken);
      await tx.authentication.update({
        where: { token: tokenHash },
        data: {
          token: tokenHash,
          expiresAt: new Date(Date.now() + 1000 * 60 * 30),
          revoked: true,
        },
      });
      await tx.authentication.create({
        data: {
          token: newHash,
          expiresAt: new Date(Date.now() + 1000 * 60 * 30),
          user_Id: oldToken.authenticationUser.user_Id,
        },
      });

      return newToken;
    });
    response.setHeader('Authorization', `Bearer ${result}`);
    return response.status(204).send();
  }
  async logout(request: Request, response: Response) {
    const [type, getToken] = request.headers.authorization?.split(' ') ?? [];
    const tokenHash = hashToken(getToken);
    const existing = await this.prisma.authentication.findUnique({
      where: { token: tokenHash },
    });

    if (!existing) {
      return buildResponse('Token no encontrado', HttpStatus.NOT_FOUND);
    }

    const isRevoked = await this.prisma.authentication.update({
      where: {
        token: tokenHash,
      },
      data: {
        revoked: true,
      },
    });
    if (!isRevoked) {
      return buildResponse('Token no encontrado', HttpStatus.NOT_FOUND);
    }
    return response.status(204).send();
  }
}
