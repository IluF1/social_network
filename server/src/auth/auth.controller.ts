import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async authUser(@Body() body: AuthDto) {
    try {
      if (body.login) {
        return await this.authService.authUserByLogin(body);
      } else if (body.email) {
        return await this.authService.authUserByEmail(body);
      } else {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'Необходимо указать логин или почту',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          error: 'Ошибка, неверный логин, почта или пароль',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
