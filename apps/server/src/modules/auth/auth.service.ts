import { createHash } from 'node:crypto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { SignInDto } from './dto/signin-in.dto';
import { SignUpDto } from './dto/signin-up.dto';
import { SignInResponse } from './types/sign-in-response.type';
import { SignUpResponse } from './types/sign-up-response.type';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signUp(payload: SignUpDto): Promise<SignUpResponse> {
    const hash = createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    const user = await this.userService.create({
      ...payload,
      hash,
    });

    const jwtPayload = {
      sub: user.id,
      username: user.username,
    };

    const accessToken = await this.jwtService.signAsync(jwtPayload);

    return {
      token: {
        accessToken: accessToken,
        expiredAt: '1d',
      },
      user,
    };
  }

  async signIn(payload: SignInDto): Promise<SignInResponse> {
    const user = await this.userService.findByUsername(payload.username);
    const isValidPassword = await bcrypt.compare(
      payload.password,
      user.password
    );

    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    const jwtPayload = {
      sub: user.id,
      username: user.username,
    };

    const accessToken = await this.jwtService.signAsync(jwtPayload);

    return {
      token: {
        accessToken,
        expiredAt: '1d',
      },
      user,
    };
  }
}
