import { Controller } from '@nestjs/common';
import { ServerUserService } from './user.service';

@Controller('user')
export class ServerUserController {
  constructor(private serverUserService: ServerUserService) {}
}
