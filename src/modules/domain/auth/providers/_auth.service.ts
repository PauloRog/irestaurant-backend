import { DatabaseService } from '@infra/database';
import { PasswordService } from '@modules/shared';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly database: DatabaseService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.database.user.findUnique({
      where: { email },
    });

    if (
      user &&
      (await this.passwordService.validatePassword(pass, user.password))
    ) {
      const { password, ...payload } = user;

      return payload;
    }

    return null;
  }

  async login(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    return { access_token: this.jwtService.sign(payload) };
  }
}
