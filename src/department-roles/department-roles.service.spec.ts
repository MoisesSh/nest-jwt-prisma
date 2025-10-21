import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentRolesService } from './department-roles.service';

describe('DepartmentRolesService', () => {
  let service: DepartmentRolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepartmentRolesService],
    }).compile();

    service = module.get<DepartmentRolesService>(DepartmentRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
