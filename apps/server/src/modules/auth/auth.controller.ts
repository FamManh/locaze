import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin-in.dto';
import { SignUpDto } from './dto/signin-up.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  signIn(@Body() payload: SignInDto) {
    return this.authService.signIn(payload);
  }

  @Post('register')
  signUp(@Body() payload: SignUpDto) {
    return this.authService.signUp(payload);
  }
}
