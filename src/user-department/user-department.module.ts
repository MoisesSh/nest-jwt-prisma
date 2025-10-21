import { Module } from '@nestjs/common';
import { UserDepartmentService } from './user-department.service';
import { UserDepartmentController } from './user-department.controller';
import { AuthGuard } from 'src/auth/guard/guard.guard';
import { APP_GUARD } from '@nestjs/core';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UserDepartmentController],
  providers: [
    UserDepartmentService,
    PrismaService,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class UserDepartmentModule {}
