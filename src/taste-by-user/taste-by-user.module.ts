import { Module } from '@nestjs/common';
import { TasteByUserService } from './taste-by-user.service';
import { TasteByUserController } from './taste-by-user.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TasteByUserController],
  providers: [TasteByUserService,PrismaService],
})
export class TasteByUserModule {}
