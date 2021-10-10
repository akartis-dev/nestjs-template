import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { USERS_ROLE } from '../interfaces/types';
import { ROLES_KEY } from './roles.decorator';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../../core/auth/interface/type';
import { GqlExecutionContext } from '@nestjs/graphql';

type requestType = 'graphql' | 'http';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtSrv: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    /** Get required role from controller method */
    const requiredRoles = this?.reflector?.getAllAndOverride<USERS_ROLE[]>(
      ROLES_KEY,
      [context?.getHandler(), context?.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    let requestHeaders;
    const type: requestType = context.getType();

    if (type === 'http') {
      const { headers } = context?.switchToHttp()?.getRequest();
      requestHeaders = headers;
    } else {
      /** Graphql */
      const gqlRequest = GqlExecutionContext.create(context);
      requestHeaders = gqlRequest.getContext()?.req?.headers;
    }

    try {
      const payload: JwtPayload = this.jwtSrv.verify(
        requestHeaders?.authorization,
      );
      return requiredRoles.includes(payload.roles);
    } catch (e) {
      return false;
    }
  }
}
