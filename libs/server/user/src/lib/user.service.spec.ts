import { Test } from '@nestjs/testing';
import { ServerUserService } from './user.service';

describe('ServerUserService', () => {
  let service: ServerUserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ServerUserService],
    }).compile();

    service = module.get(ServerUserService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
