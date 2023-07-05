import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Request,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EntryData } from '../../common/dto/entry-data.dto';
import { ApiOkResponse } from '../../decorators/api-ok-response.decorator';
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

  @ApiBearerAuth()
  @Get('me')
  // Todo: AuthGuard
  @HttpCode(HttpStatus.OK)
  public me(@Request() request): Promise<NullableType<User>> {
    return this.service.me(request.user);
  }

  @ApiBearerAuth()
  @Patch('me')
  // Todo: AuthGuard
  @HttpCode(HttpStatus.OK)
  public update(
    @Request() request,
    @Body() userDto: AuthUpdateDto
  ): Promise<NullableType<User>> {
    return this.service.update(request.user, userDto);
  }

  @ApiBearerAuth()
  @Patch('me/password')
  // Todo: AuthGuard
  @HttpCode(HttpStatus.OK)
  public updatePassword(
    @Request() request,
    @Body() userDto: AuthUpdatePasswordDto
  ): Promise<NullableType<User>> {
    return this.service.updatePassword(request.user, userDto);
  }
}
