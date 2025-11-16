import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { updateInfoDto } from './dto/update-info.dto';
import { updatePasswordDto } from './dto/update-password.dto';
import { Public } from 'src/common/decorator_public';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Patch(':id/info')
  @Public()
  async updateInfo(@Param('id',ParseIntPipe) id: number,@Body() updateInfoDto: updateInfoDto) {
    return await this.userService.updateInfo(id,updateInfoDto);
  }
  @Patch(':id/password')
    @Public()
    async update(@Param('id',ParseIntPipe) id: number, @Body() updatePasswordDto: updatePasswordDto) {
    return await this.userService.update(id, updatePasswordDto);
  }
}
