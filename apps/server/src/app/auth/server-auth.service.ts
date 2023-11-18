import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity, UserService } from '../user';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    username: string,
    password: string
  ): Promise<UserEntity | null> {
    const user = await this.userService.findRecordByUsername(username);

    if (user.password !== password)
      throw new UnauthorizedException('Incorrect password entered.');

    return user;
  }

  async login(user: AuthDto): Promise<{ accessToken: string }> {
    const payload = { sub: user.username };

    const isValidUser = await this.validateUser(user.username, user.password);

    if (!isValidUser)
      throw new UnauthorizedException('Incorrect username or password');

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
