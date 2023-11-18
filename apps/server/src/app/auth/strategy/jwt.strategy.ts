import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../../user';
import { UserEntity } from '../../user';
import { JwtPayload } from '../types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env['JWT_SECRET'],
    });
  }

  async validate(payload: JwtPayload): Promise<UserEntity> {
    const user = await this.userService.findRecordByUsername(payload.sub);

    if (!user) throw new UnauthorizedException('User not found.');

    return user;
  }
}
