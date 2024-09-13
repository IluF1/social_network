import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('refreshToken')
  async refreshToken(@Body('refresh_token') refreshToken: string) {
    return this.userService.getUserByRefreshToken(refreshToken);
  }

  @Post('login')
  async login(@Body('login') login: string) {
    return this.userService.getUserByLogin(login);
  }
}
