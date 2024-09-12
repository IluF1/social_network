import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  private async findUser(user: AuthDto) {
    if (user.login) {
      return await this.prisma.user.findUnique({
        where: { login: user.login },
      });
    }

    return await this.prisma.user.findUnique({ where: { email: user.email } });
  }

  private async authenticateUser(findUser, password: string) {
    if (!findUser) {
      throw new NotFoundException('Такого пользователя не существует');
    }

    if (!password) {
      throw new UnauthorizedException('Пароль не указан');
    }

    const isPasswordValid = await bcrypt.compare(password, findUser.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный пароль');
    }

    return findUser;
  }

  async authUser(user: AuthDto) {
    if (!user.login && !user.email) {
      throw new UnauthorizedException('Необходимо указать логин или почту');
    }

    const findUser = await this.findUser(user);

    if (!findUser) {
      throw new NotFoundException('Такого пользователя не существует');
    }

    const authenticatedUser = await this.authenticateUser(
      findUser,
      user.password,
    );

    const { password, ...userWithoutPassword } = authenticatedUser;

    return {
      message: 'Аутентификация успешна',
      user: userWithoutPassword,
    };
  }
}
