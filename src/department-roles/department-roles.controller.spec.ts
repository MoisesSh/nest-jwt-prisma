import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentRolesController } from './department-roles.controller';
import { DepartmentRolesService } from './department-roles.service';

describe('DepartmentRolesController', () => {
  let controller: DepartmentRolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentRolesController],
      providers: [DepartmentRolesService],
    }).compile();

    controller = module.get<DepartmentRolesController>(DepartmentRolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
