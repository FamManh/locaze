import { createHash } from 'node:crypto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserStatusEnum } from '../user/enums/user-status.enum';
import { UserService } from '../user/user.service';
import { SignUpResponseDto } from './dto/sign-up-response.dto';
import { SignInDto } from './dto/signin-in.dto';
import { SignUpDto } from './dto/signin-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signUp(payload: SignUpDto): Promise<SignUpResponseDto> {
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
    // Todo: send email verify email
    return {
      token: {
        accessToken: accessToken,
        expiredAt: '1d',
      },
      user,
    };
  }

  async signIn(payload: SignInDto): Promise<SignUpResponseDto> {
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

  async confirmEmail(hash: string): Promise<void> {
    const user = await this.userService.findOne({
      hash,
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `notFound`,
        },
        HttpStatus.NOT_FOUND
      );
    }

    user.hash = null;
    user.status = UserStatusEnum.active;
    await user.save();
  }

  async forgotEmail(email: string) {
    const user = await this.userService.findOne({ email });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'emailNotExists',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }
  }
}
