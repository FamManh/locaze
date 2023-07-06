import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

// import { User } from '../modules/user/entities/user.entity';
// import { ContextProvider } from '../providers';

@Injectable()
export class AuthUserInterceptor implements NestInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // const request = context.switchToHttp().getRequest();

    // const user = <User>request.user;
    // ContextProvider.setAuthUser(user);
    // console.log({ user });
    return next.handle();
  }
}
