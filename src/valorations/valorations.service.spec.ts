import { Test, TestingModule } from '@nestjs/testing';
import { ValorationsService } from './valorations.service';

describe('ValorationsService', () => {
  let service: ValorationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValorationsService],
    }).compile();

    service = module.get<ValorationsService>(ValorationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
