import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ServerUserModule } from '../user';
import { AuthService } from './server-auth.service';
import { AuthController } from './server-auth.controller';
import { JwtStrategy } from './strategy';

@Module({
  imports: [
    ServerUserModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env['JWT_SECRET'],
      signOptions: { expiresIn: '1800s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class ServerAuthModule {}
