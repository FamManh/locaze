import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { isEmpty } from 'lodash';

import type { RoleType } from '../constants';
import { User } from '../modules/user/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<RoleType[]>('roles', context.getHandler());

    if (isEmpty(roles)) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = <User>request.user;

    return roles.includes(user.role);
  }
}
