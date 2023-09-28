import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { LogInDto } from './dtos/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('log-in')
  async logIn(@Body(new ValidationPipe()) logInDto: LogInDto) {
    return {
      data: await this.authService.login(logInDto),
    };
  }
}
