import { Test, TestingModule } from '@nestjs/testing';
import { TasteController } from './taste.controller';
import { TasteService } from './taste.service';

describe('TasteController', () => {
  let controller: TasteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasteController],
      providers: [TasteService],
    }).compile();

    controller = module.get<TasteController>(TasteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
