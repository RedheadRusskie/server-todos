import { Module } from '@nestjs/common';
import { AuthController } from './server-auth.controller';
import { ServerUserModule } from '@doit/server-user';
import { AuthService } from './server-auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [ServerUserModule],
})
export class ServerAuthModule {}
