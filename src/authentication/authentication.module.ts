import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { PrismaService } from 'src/prisma.service';
import { UserService } from './user.service';

const JWTConfig = {
  PassportModule,
  useFactory: () => ({
    secret: 'some-secret-key',
    signOptions: {
      expiresIn: '1800s',
    },
  }),
};

@Module({
  imports: [JwtModule.registerAsync(JWTConfig)],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, PrismaService, UserService],
  exports: [JwtModule, AuthenticationService, UserService],
})
export class AuthenticationModule {}
