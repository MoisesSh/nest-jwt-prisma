import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, singInAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from './guard/guard.guard';
import { Public } from 'src/common/decorator_public';
import { Request, Response } from 'express';
import { RefreshTokenGuardGuard } from './refresh-token-guard/refresh-token-guard.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('singIn')
  @Public()
  singIn(@Body() singInAuthDto: singInAuthDto) {
    return this.authService.singIn(singInAuthDto);
  }
  @Post('singUp')
  @Public()
  singUp(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.singUp(createAuthDto);
  }
  @Post('logout')
  logout(@Req() request: Request, @Res() response: Response) {
    return this.authService.logout(request, response);
  }
  @Post('refresh')
  @UseGuards(RefreshTokenGuardGuard)
  @Public()
  async refreshToken(@Req() request: Request, @Res() response: Response) {
    return await this.authService.refreshToken(request, response);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.authService.findOne(+id);
  }
}
