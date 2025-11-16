import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { ValorationsService } from './valorations.service';
import { CreateValorationDto } from './dto/create-valoration.dto';

@Controller('valorations')
export class ValorationsController {
  constructor(private readonly valorationsService: ValorationsService) {}

  @Post()
  create(@Body() createValorationDto: CreateValorationDto) {
    return this.valorationsService.create(createValorationDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.valorationsService.remove(+id);
  }
}
