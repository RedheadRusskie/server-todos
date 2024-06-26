import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { UserEntity, UserService } from '../user';
import { AuthDto } from './dto';
import { AuthRO } from './types';

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
    const user = await this.userService.findRecord(
      { username },
      'User not found with provided username.',
      true
    );

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid)
      throw new UnauthorizedException('Incorrect password entered.');

    return user;
  }

  async login(userAuthDto: AuthDto): Promise<AuthRO> {
    const payload = { sub: userAuthDto.username };

    const validUser = await this.validateUser(
      userAuthDto.username,
      userAuthDto.password
    );

    if (!validUser)
      throw new UnauthorizedException('Incorrect username or password');

    return {
      accessToken: this.jwtService.sign(payload),
      userId: validUser.id,
    };
  }
}
