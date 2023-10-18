import { Test } from '@nestjs/testing';
import { ServerUserController } from './user.controller';
import { ServerUserService } from './user.service';

describe('ServerUserController', () => {
  let controller: ServerUserController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ServerUserService],
      controllers: [ServerUserController],
    }).compile();

    controller = module.get(ServerUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
