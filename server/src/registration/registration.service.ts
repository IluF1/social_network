import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegistrationDto } from './dto/registration.dto';


@Injectable()
export class RegistrationService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async registration(userDto: RegistrationDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: userDto.email },
          { login: userDto.login },
        ],
      },
    });

    if (existingUser) {
      if (existingUser.email === userDto.email) {
        throw new ForbiddenException('Почта недоступна для регистрации');
      }
      if (existingUser.login === userDto.login) {
        throw new ForbiddenException('Логин недоступен для регистрации');
      }
    }

    const hashPassword = await bcrypt.hash(userDto.password, 12);
    const createUser = await this.prisma.user.create({
      data: {
        login: userDto.login,
        email: userDto.email,
        name: userDto.name,
        password: hashPassword,
      },
    });

    return {
      message: 'Вы успешно зарегистрировались',
      user: {
        login: createUser.login,
        email: createUser.email,
        name: createUser.name,
      },
    };
  }
  

}