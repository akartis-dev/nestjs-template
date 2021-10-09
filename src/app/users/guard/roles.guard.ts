import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { USERS_ROLE } from '../interfaces/types';
import { ROLES_KEY } from './roles.decorator';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../../core/auth/interface/type';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtSrv: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    /** Get required role from controller method */
    const requiredRoles = this?.reflector?.getAllAndOverride<USERS_ROLE[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const { headers } = context.switchToHttp().getRequest();

    try {
      const payload: JwtPayload = this.jwtSrv.verify(headers?.authorization);
      return requiredRoles.includes(payload.roles);
    } catch (e) {
      return false;
    }
  }
}
