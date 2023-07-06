import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RoleType, TokenType } from '../../../constants';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('auth.secret'),
    });
  }

  async validate(arg: {
    sub: number; // user id
    role: RoleType;
    type: TokenType;
  }): Promise<User> {
    if (arg.type !== TokenType.ACCESS_TOKEN) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findOne({
      id: arg.sub,
      role: arg.role,
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
