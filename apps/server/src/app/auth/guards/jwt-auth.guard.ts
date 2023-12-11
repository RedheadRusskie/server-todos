import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler()
    );

    if (isPublic) return true;

    return super.canActivate(context);
  }

  // Unused info argument required
  handleRequest(err, user, info, context) {
    if (err || !user) throw err || new UnauthorizedException();

    context.switchToHttp().getRequest().user = user;

    return user;
  }
}
