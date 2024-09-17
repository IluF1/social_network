import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Request } from 'express';

@Controller('api/login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() userDto: AuthDto, @Req() req: Request) {
    return this.authService.authUser(userDto, req.session);
  }

}
