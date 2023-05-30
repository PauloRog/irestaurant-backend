import { PasswordModule } from '@modules/shared';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './controller';
import { AuthService } from './providers';
import { LocalStrategy } from './strategies';
import { JwtStrategy } from './strategies/_jwt.strategy';

@Module({
  imports: [PasswordModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
