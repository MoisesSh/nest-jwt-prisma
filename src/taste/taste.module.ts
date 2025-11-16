import { Module } from '@nestjs/common';
import { TasteService } from './taste.service';
import { TasteController } from './taste.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TasteController],
  providers: [TasteService,PrismaService],
})
export class TasteModule {}
