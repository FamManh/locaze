import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EntryData } from '../../common/dto/entry-data.dto';
import { RoleType } from '../../constants';
import { ApiOkResponse } from '../../decorators/api-ok-response.decorator';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { Auth } from '../../decorators/http.decorators';
import { NullableType } from '../../utils/types/nullable.type';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthForgotPasswordDto } from './dto/auth-forgot-password.dto';
import { AuthResetPasswordDto } from './dto/auth-reset-password.dto';
import { AuthUpdatePasswordDto } from './dto/auth-update-password.dto';
import { AuthUpdateDto } from './dto/auth-update.dto';
import { SignUpResponseDto } from './dto/sign-up-response.dto';
import { SignInDto } from './dto/signin-in.dto';
import { SignUpDto } from './dto/signin-up.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  @ApiOkResponse({
    type: SignUpResponseDto,
    description: 'Successfully Logged in',
  })
  async signIn(@Body() payload: SignInDto) {
    const res = await this.service.signIn(payload);
    return new EntryData({
      data: res,
      message: 'Login successfully',
      success: true,
    });
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: SignUpResponseDto,
    description: 'Successfully Registered',
  })
  async signUp(@Body() payload: SignUpDto) {
    const res = await this.service.signUp(payload);
    return new EntryData({
      data: res,
      message: 'Register successfully',
      success: true,
    });
  }

  @Post('forgot/password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async forgotPassword(
    @Body() forgotPasswordDto: AuthForgotPasswordDto
  ): Promise<void> {
    return this.service.forgotPassword(forgotPasswordDto.email);
  }

  @Post('reset/password')
  @HttpCode(HttpStatus.NO_CONTENT)
  resetPassword(@Body() resetPasswordDto: AuthResetPasswordDto): Promise<void> {
    return this.service.resetPassword(
      resetPasswordDto.hash,
      resetPasswordDto.password
    );
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Auth([RoleType.USER])
  public me(@AuthUser() user: User): Promise<NullableType<User>> {
    return this.service.me(user);
  }

  @Patch('me')
  @HttpCode(HttpStatus.OK)
  @Auth([RoleType.USER])
  public update(
    @AuthUser() user: User,
    @Body() userDto: AuthUpdateDto
  ): Promise<NullableType<User>> {
    return this.service.update(user, userDto);
  }

  @Patch('me/password')
  @HttpCode(HttpStatus.OK)
  @Auth([RoleType.USER])
  public updatePassword(
    @AuthUser() user: User,
    @Body() userDto: AuthUpdatePasswordDto
  ): Promise<NullableType<User>> {
    return this.service.updatePassword(user, userDto);
  }
}
