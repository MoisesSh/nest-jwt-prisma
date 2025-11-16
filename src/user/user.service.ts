import { HttpStatus, Injectable } from '@nestjs/common';
import { updateInfoDto } from './dto/update-info.dto';
import { updatePasswordDto } from './dto/update-password.dto';
import { PrismaService } from 'src/prisma.service';
import { buildResponse } from 'src/common/response.helper';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async updateInfo(id: number, updateInfoDto: updateInfoDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        user_Id: id,
      },
    });
    if (!user) {
      return buildResponse('User not found',HttpStatus.NOT_FOUND);
    }
    const updateUser = await this.prisma.user.update({
      where: { user_Id: id },
      data: { ...updateInfoDto },
    });
    if (!updateUser) {
      return buildResponse('Error updating user',HttpStatus.BAD_REQUEST);
    }
    return buildResponse('User updated successfully',HttpStatus.OK);
  }
  async update(id: number, updatePasswordDto: updatePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        user_Id: id,
      },
    });
    if (!user) {
      return buildResponse('User not found',HttpStatus.NOT_FOUND);
    }
    const { beforePassword, afterPassword, confirmAfterPassword } = updatePasswordDto as Partial<updatePasswordDto>;
    if (!beforePassword || !afterPassword || !confirmAfterPassword) {
      return buildResponse('Current password, new password and confirmation are required', HttpStatus.BAD_REQUEST);
    }

    if (afterPassword !== confirmAfterPassword) {
      return buildResponse('New password and confirmation do not match', HttpStatus.BAD_REQUEST);
    }

    const isPasswordValid = await bcrypt.compare(beforePassword, user.passwordHash || '');
    if (!isPasswordValid) {
      return buildResponse('Invalid password',HttpStatus.UNAUTHORIZED);
    }

    const hash = await bcrypt.hash(afterPassword, 12);
    await this.prisma.user.update({
      where: { user_Id: id },
      data: { passwordHash: hash },
    });
    return buildResponse('User updated successfully',HttpStatus.OK);
  }
}
