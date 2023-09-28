import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LogInDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
  ) {}

  async login(logInDto: LogInDto) {
    console.log(logInDto)
    if(logInDto.user_number_or_cc) {
      const user = await this.userService.findByUserNumberOrCC(logInDto.user_number_or_cc);
      console.log(user)
      if (user) {
        if (logInDto.password == user.password) {
          return user;
        }
      }
    }

    throw new UnauthorizedException();
  }
}