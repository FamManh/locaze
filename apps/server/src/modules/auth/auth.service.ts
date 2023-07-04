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
import { NullableType } from '../../utils/types/nullable.type';
import { ForgotService } from '../forgot/forgot.service';
import { MailService } from '../mail/mail.service';
import { User } from '../user/entities/user.entity';
import { UserStatusEnum } from '../user/enums/user-status.enum';
import { UserService } from '../user/user.service';
import { AuthUpdatePasswordDto } from './dto/auth-update-password.dto';
import { AuthUpdateDto } from './dto/auth-update.dto';
import { SignUpResponseDto } from './dto/sign-up-response.dto';
import { SignInDto } from './dto/signin-in.dto';
import { SignUpDto } from './dto/signin-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,
    private forgotService: ForgotService
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

  async forgotPassword(email: string) {
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

    const hash = createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    await this.forgotService.create({
      hash,
      user,
    });

    await this.mailService.forgotPassword({
      to: email,
      data: {
        hash,
      },
    });
  }

  async resetPassword(hash: string, password: string) {
    const forgot = await this.forgotService.findOne({
      where: { hash },
    });
    if (!forgot) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            hash: 'notFound',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    const user = forgot.user;
    user.password = password;
    await this.forgotService.softDelete(forgot.id);
  }

  async me(user: User): Promise<NullableType<User>> {
    return this.userService.findOne({
      id: user.id,
    });
  }

  async update(
    user: User,
    userDto: AuthUpdateDto
  ): Promise<NullableType<User>> {
    await this.userService.update(user.id, userDto);

    return this.userService.findOne({
      id: user.id,
    });
  }

  async updatePassword(
    user: User,
    userDto: AuthUpdatePasswordDto
  ): Promise<NullableType<User>> {
    const currentUser = await this.userService.findOne({
      id: user.id,
    });

    if (!currentUser) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            user: 'userNotFound',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    const isValidOldPassword = await bcrypt.compare(
      userDto.oldPassword,
      currentUser.password
    );

    if (!isValidOldPassword) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            oldPassword: 'incorrectOldPassword',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    await this.userService.update(user.id, userDto);

    return this.userService.findOne({
      id: user.id,
    });
  }
}
