import { Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './server-auth.service';
import { UserEntity } from '../user';
import { IsPublic } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @IsPublic()
  async login(@Request() req): Promise<{ accessToken: string }> {
    const user = req.body;
    const token = await this.authService.login(user);
    return token;
  }

  @Post('register')
  @IsPublic()
  async register(@Request() req): Promise<UserEntity> {
    const { username, password } = req.body;
    const user = await this.authService.validateUser(username, password);
    return user;
  }
}
