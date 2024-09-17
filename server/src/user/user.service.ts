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

    return {
      login: user.login,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
    };
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

    return {
      login: user.login,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      id: user.id
    };
  }

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if(!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return {
      name: user.name,
      login: user.login,
      avatar: user.avatar,
      id: user.id
    }
  }

  async logout(sessionToken: string) {
    try {
      await this.prisma.session.delete({
        where: { sessionToken: sessionToken },
      });
    } catch (error) {
      console.error('Ошибка при удалении сессии:', error);
      throw new NotFoundException('Сессия не найдена или уже удалена');
    }
  }

  async getAllUsers() {
    return await this.prisma.user.findMany();
  }
}
