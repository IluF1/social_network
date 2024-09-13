import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  private async findUser(user: UserDto) {
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

    const isPasswordValid = await bcrypt.compare(password, findUser.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный пароль');
    }

    return findUser;
  }

  async authUser(user: UserDto) {
    if (!user.login && !user.email) {
      throw new UnauthorizedException('Необходимо указать логин или почту');
    }

    const findUser = await this.findUser(user);
    const authenticatedUser = await this.authenticateUser(
      findUser,
      user.password,
    );

    const { password, ...userWithoutPassword } = authenticatedUser;

    const accessToken = this.jwtService.sign(
      { sub: authenticatedUser.id },
      { expiresIn: '15m' },
    );
    const refreshToken = this.jwtService.sign(
      { sub: authenticatedUser.id },
      { expiresIn: '7d' },
    );

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.prisma.user.update({
      where: { id: authenticatedUser.id },
      data: { refreshToken: hashedRefreshToken },
    });

    return {
      message: 'Аутентификация успешна',
      user: userWithoutPassword,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('Пользователь не найден');
      }

      const isRefreshTokenValid = await bcrypt.compare(
        refreshToken,
        user.refreshToken,
      );
      if (!isRefreshTokenValid) {
        throw new UnauthorizedException('Неверный refresh token');
      }
      const newAccessToken = this.jwtService.sign(
        { sub: user.id },
        { expiresIn: '15m' },
      );

      const newRefreshToken = this.jwtService.sign(
        { sub: user.id },
        { expiresIn: '7d' },
      );
      const hashedNewRefreshToken = await bcrypt.hash(newRefreshToken, 10);
      await this.prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: hashedNewRefreshToken },
      });

      return {
        access_token: newAccessToken,
        refresh_token: newRefreshToken, 
      };
    } catch (error) {
      console.error('Ошибка при обновлении токена:', error.message);
      throw new UnauthorizedException('Неверный refresh token');
    }
  }
}
