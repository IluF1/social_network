import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body('login') login: string) {
    return this.userService.getUserByLogin(login);
  }

  @Post('session')
  async session(@Body('sessionToken') sessionToken: string) {
    return this.userService.getUserBySession(sessionToken);
  }

  @Post('logout')
  async logout(@Body() body: { sessionToken: string }) {
    return this.userService.logout(body.sessionToken);
  }

  @Get('getAll')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post('getById')
  async getUserById(@Body() body: { id: number }) {
    return this.userService.getUserById(body.id);
  }
}
