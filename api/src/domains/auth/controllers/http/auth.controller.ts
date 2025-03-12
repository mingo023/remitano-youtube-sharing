import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../../services/auth.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { SignInDto } from '../dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body.email, body.password);
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body.email, body.password);
  }
}
