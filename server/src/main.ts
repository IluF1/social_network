import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 5000;

  app.use(
    session({
      secret: process.env.SECRET_KEY || 'secret',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
    }),
  );

  app.enableCors();

  const logger = new Logger('Bootstrap');
  await app.listen(PORT);
  logger.log(`Server started on port ${PORT}`);
}

bootstrap();
