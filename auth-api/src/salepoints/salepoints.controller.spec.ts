import { Test, TestingModule } from '@nestjs/testing';
import { SalepointsController } from './salepoints.controller';

describe('SalepointsController', () => {
  let controller: SalepointsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalepointsController],
    }).compile();

    controller = module.get<SalepointsController>(SalepointsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
