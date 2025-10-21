import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthGuard } from 'src/auth/guard/guard.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [DepartmentsController],
  providers: [
    DepartmentsService,
    PrismaService,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class DepartmentsModule {}
