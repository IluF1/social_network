import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserByRefreshToken(refreshToken: string) {
    const user = await this.prisma.user.findFirst({
      where: { refreshToken },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  async getUserByLogin(login: string) {
    const user = await this.prisma.user.findUnique({
        where: {
            login: login
        }
    })

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user
  }
}
