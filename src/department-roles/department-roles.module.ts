import { Module } from '@nestjs/common';
import { DepartmentRolesService } from './department-roles.service';
import { DepartmentRolesController } from './department-roles.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthGuard } from 'src/auth/guard/guard.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [DepartmentRolesController],
  providers: [
    DepartmentRolesService,
    PrismaService,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class DepartmentRolesModule {}
