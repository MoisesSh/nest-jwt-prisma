import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthGuard } from 'src/auth/guard/guard.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [RolesController],
  providers: [
    RolesService,
    PrismaService,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class RolesModule {}
