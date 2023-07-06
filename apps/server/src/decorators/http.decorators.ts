import {
  SetMetadata,
  UseGuards,
  UseInterceptors,
  applyDecorators,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RoleType } from '../constants';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { AuthUserInterceptor } from '../interceptors/auth-user-interceptor.service';
import { PublicRoute } from './public-route.decorator';

export function Auth(
  roles: RoleType[],
  options?: Partial<{ public: boolean }>
): MethodDecorator {
  const isPublicRoute = options?.public;
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard({ public: isPublicRoute }), RolesGuard),
    ApiBearerAuth(),
    UseInterceptors(AuthUserInterceptor),
    PublicRoute(isPublicRoute)
  );
}
