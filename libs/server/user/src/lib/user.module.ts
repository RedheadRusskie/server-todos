import { Module } from '@nestjs/common';
import { ServerUserController } from './user.controller';
import { ServerUserService } from './user.service';

@Module({
  controllers: [ServerUserController],
  providers: [ServerUserService],
  exports: [ServerUserService],
})
export class ServerUserModule {}
