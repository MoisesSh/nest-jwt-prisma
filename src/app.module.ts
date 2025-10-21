import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { DepartmentsModule } from './departments/departments.module';
import { UsersRolesModule } from './users-roles/users-roles.module';
import { DepartmentRolesModule } from './department-roles/department-roles.module';
import { UserDepartmentModule } from './user-department/user-department.module';
import { AuthGuard } from './auth/guard/guard.guard';
import { APP_GUARD } from '@nestjs/core';
import { BolivarModule } from './bolivar/bolivar.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    RolesModule,
    DepartmentsModule,
    UsersRolesModule,
    DepartmentRolesModule,
    UserDepartmentModule,
    BolivarModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AppModule {}
