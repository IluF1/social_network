import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  authUserByEmail(body: AuthDto) {
    throw new Error('Method not implemented.');
  }
  authUserByLogin(body: AuthDto) {
    throw new Error('Method not implemented.');
  }

  constructor(private prisma: PrismaService) {}

  private async authenticateUser(findUser, password: string) {
    if (!findUser) {
      throw new NotFoundException('Такого пользователя не существует');
    }

    const isPasswordValid = await bcrypt.compare(password, findUser.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный пароль');
    }

    return findUser;
  }

  async authUser(user: AuthDto) {
    const findUser = user.login
      ? await this.prisma.user.findUnique({ where: { login: user.login } })
      : await this.prisma.user.findUnique({ where: { email: user.email } });

    const authenticatedUser = await this.authenticateUser(
      findUser,
      user.password,
    );

    return { message: 'Аутентификация успешна', user: authenticatedUser };
  }
}
