import { Module } from '@nestjs/common';
import { AuthController } from './server-auth.controller';
import { ServerUserModule } from '@doit/server-user';
import { AuthService } from './server-auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    ServerUserModule,
    JwtModule.register({
      global: true,
      secret: process.env['JWT_SECRET'],
      signOptions: { expiresIn: '1800s' },
    }),
  ],
})
export class ServerAuthModule {}
