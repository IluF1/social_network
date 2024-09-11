import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RegistrationModule } from './registration/registration.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, RegistrationModule, PrismaModule],
  exports: [PrismaModule],
})
export class AppModule {}
