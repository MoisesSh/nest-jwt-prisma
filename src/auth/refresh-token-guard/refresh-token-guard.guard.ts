import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Request } from 'express';
import { jwtConstants } from '../constants';
import { hashToken } from '../token.utils';
@Injectable()
export class RefreshTokenGuardGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token no encontrado');
    }
    const tokenHash = hashToken(token);
    const [payload, storedToken] = await this.prisma.$transaction(
      async (tx) => {
        const storedToken = await tx.authentication.findUnique({
          where: {
            token: tokenHash,
          },
        });
        if (!storedToken) {
          throw new HttpException('El Token No Existe', HttpStatus.NOT_FOUND);
        }

        const user = await tx.user.findUnique({
          where: {
            user_Id: storedToken.user_Id,
          },
        });
        if (!user) {
          throw new HttpException('El Usuario No Existe', HttpStatus.NOT_FOUND);
        }
        return [
          { name: user.name, email: user.email, id: user.user_Id },
          storedToken,
        ];
      },
    );

    if (storedToken.revoked) {
      throw new UnauthorizedException('Este token ya fue revocado');
    } else {
      try {
        const verified = await this.jwtService.verifyAsync(token, {
          secret: jwtConstants.secret,
          ignoreExpiration: true,
        });
        if (!verified) {
          throw new UnauthorizedException('Token no valido');
        }
        request['user'] = payload;
        return true;
      } catch (err) {
        throw new HttpException(
          'Ha ocurrido un error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
