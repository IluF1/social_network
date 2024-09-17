import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  private async findUser(user: AuthDto) {
    if (user.login) {
      return this.prisma.user.findUnique({
        where: { login: user.login },
      });
    }

    return this.prisma.user.findUnique({ where: { email: user.email } });
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

  async createSession(userId: number) {
    const sessionToken = uuidv4();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

    return this.prisma.session.create({
      data: {
        userId,
        sessionToken,
        expiresAt,
      },
    });
  }

  async authUser(user: AuthDto, session: any) {
    const findUser = await this.findUser(user);
    const authenticatedUser = await this.authenticateUser(
      findUser,
      user.password,
    );
    const existingSession = await this.prisma.session.findFirst({
      where: { userId: authenticatedUser.id },
    });

    if (existingSession) {
      await this.prisma.session.update({
        where: { id: existingSession.id },
        data: { updatedAt: new Date() },
      });

      session.sessionToken = existingSession.sessionToken;
    } else {
      const newSession = await this.createSession(authenticatedUser.id);
      session.sessionToken = newSession.sessionToken;
    }

    return {
      message: 'Аутентификация успешна',
      user: {
        name: authenticatedUser.name,
        login: authenticatedUser.login,
        email: authenticatedUser.email,
        avatar: authenticatedUser.avatar,
      },
      sessionToken: session.sessionToken,
    };
  }
}
