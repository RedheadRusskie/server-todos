import { Module } from '@nestjs/common';
import { ServerAuthController } from './server-auth.controller';

@Module({
  controllers: [ServerAuthController],
  providers: [],
  exports: [],
})
export class ServerAuthModule {}
