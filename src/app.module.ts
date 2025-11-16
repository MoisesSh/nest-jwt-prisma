import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { DepartmentsModule } from './departments/departments.module';
import { UsersRolesModule } from './users-roles/users-roles.module';
import { DepartmentRolesModule } from './department-roles/department-roles.module';
import { UserDepartmentModule } from './user-department/user-department.module';
import { AuthGuard } from './auth/guard/guard.guard';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { ValorationsModule } from './valorations/valorations.module';
import { TasteModule } from './taste/taste.module';
import { TasteByUserModule } from './taste-by-user/taste-by-user.module';

@Module({
  imports: [
    AuthModule,
    RolesModule,
    DepartmentsModule,
    UsersRolesModule,
    DepartmentRolesModule,
    UserDepartmentModule,
    UserModule,
    ArtistModule,
    ValorationsModule,
    TasteModule,
    TasteByUserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AppModule {}
