import { Test, TestingModule } from '@nestjs/testing';
import { TasteByUserService } from './taste-by-user.service';

describe('TasteByUserService', () => {
  let service: TasteByUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasteByUserService],
    }).compile();

    service = module.get<TasteByUserService>(TasteByUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
