import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EntryData } from '../../common/dto/entry-data.dto';
import { ApiOkResponse } from '../../decorators/api-ok-response.decorator';
import { AuthService } from './auth.service';
import { AuthForgotPasswordDto } from './dto/auth-forgot-password.dto';
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
}
