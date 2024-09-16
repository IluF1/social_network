import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RegistrationModule } from './registration/registration.module';
import { PrismaModule } from './prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import * as session from 'express-session';

@Module({
  imports: [
    AuthModule,
    RegistrationModule,
    PrismaModule,
    UserModule,
    PostModule,
  ],
  exports: [PrismaModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          secret: process.env.SECRET_KEY || 'secret',
          resave: false,
          saveUninitialized: false,
          cookie: { maxAge: 3600000, httpOnly: true },
        }),
      )
      .forRoutes('*');
  }
}