import { UserService } from '@doit/server-user';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.userService.findRecordByUsername(username);

    if (!user) throw new HttpException('User not found.', HttpStatus.NOT_FOUND);

    if (user?.password !== pass)
      throw new UnauthorizedException('Incorrect password.');

    const payload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
