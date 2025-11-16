import { Module } from '@nestjs/common';
import { ValorationsService } from './valorations.service';
import { ValorationsController } from './valorations.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ValorationsController],
  providers: [ValorationsService,PrismaService],
})
export class ValorationsModule {}
