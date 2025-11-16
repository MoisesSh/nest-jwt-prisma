import { Controller, Get, Post, Body} from '@nestjs/common';
import { TasteService } from './taste.service';
import { CreateTasteDto } from './dto/create-taste.dto';

@Controller('taste')
export class TasteController {
  constructor(private readonly tasteService: TasteService) {}

  @Post()
  create(@Body() createTasteDto: CreateTasteDto) {
    return this.tasteService.create(createTasteDto);
  }

  @Get()
  findAll() {
    return this.tasteService.findAll();
  }
}
