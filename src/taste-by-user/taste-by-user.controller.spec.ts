import { Test, TestingModule } from '@nestjs/testing';
import { TasteByUserController } from './taste-by-user.controller';
import { TasteByUserService } from './taste-by-user.service';

describe('TasteByUserController', () => {
  let controller: TasteByUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasteByUserController],
      providers: [TasteByUserService],
    }).compile();

    controller = module.get<TasteByUserController>(TasteByUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
