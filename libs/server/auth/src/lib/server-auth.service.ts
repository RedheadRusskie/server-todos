import { UserService } from '@doit/server-user';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signIn(username: string, pass: string) {
    const user = await this.userService.findRecordByUsername(username);

    if (!user) throw new HttpException('User not found.', HttpStatus.NOT_FOUND);

    if (user?.password !== pass)
      throw new UnauthorizedException('Incorrect password.');

    return { ...user };

    //TODO: JWT
  }
}
