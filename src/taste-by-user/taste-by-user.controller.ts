import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasteByUserService } from './taste-by-user.service';
import { CreateTasteByUserDto } from './dto/create-taste-by-user.dto';
import { UpdateTasteByUserDto } from './dto/update-taste-by-user.dto';

@Controller('taste-by-user')
export class TasteByUserController {
  constructor(private readonly tasteByUserService: TasteByUserService) {}

  @Post()
  create(@Body() createTasteByUserDto: CreateTasteByUserDto) {
    return this.tasteByUserService.create(createTasteByUserDto);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTasteByUserDto: UpdateTasteByUserDto) {
    return this.tasteByUserService.update(+id, updateTasteByUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasteByUserService.remove(+id);
  }
}
