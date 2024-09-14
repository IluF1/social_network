import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserByLogin(login: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        login: login,
      },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  async getUserBySession(sessionToken: string) {
    const session = await this.prisma.session.findUnique({
      where: {
        sessionToken: sessionToken,
      },
    });

    if (!session) {
      throw new NotFoundException('Сессия не найдена');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: session.userId,
      },
    });

    return user;
  }

  async logout(sessionToken: string) {
    try {
      await this.prisma.session.delete({
        where: { sessionToken: sessionToken },
      });
    } catch (error) {
      console.error('Ошибка при удалении сессии:', error);
      throw new NotFoundException('Сессия не найдена');
    }
  }
}
