import { Module } from '@nestjs/common';
import { UsersRolesService } from './users-roles.service';
import { UsersRolesController } from './users-roles.controller';
import { PrismaService } from 'src/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/guard/guard.guard';

@Module({
  controllers: [UsersRolesController],
  providers: [
    UsersRolesService,
    PrismaService,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class UsersRolesModule {}
