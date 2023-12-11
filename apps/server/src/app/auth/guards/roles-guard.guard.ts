import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums';
import { ROLE_KEY } from '../decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) return true;

    const { user, params } = context.switchToHttp().getRequest();

    const hasRequiredRole = requiredRoles.some(
      (requiredRole) => user.role.id === requiredRole
    );

    if (!hasRequiredRole) return false;

    if (params.userId && user.id !== params.userId) {
      if (user.role.id !== Role.Superuser) return false;
    }

    return true;
  }
}
