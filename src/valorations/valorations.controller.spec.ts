import { Test, TestingModule } from '@nestjs/testing';
import { ValorationsController } from './valorations.controller';
import { ValorationsService } from './valorations.service';

describe('ValorationsController', () => {
  let controller: ValorationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValorationsController],
      providers: [ValorationsService],
    }).compile();

    controller = module.get<ValorationsController>(ValorationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
