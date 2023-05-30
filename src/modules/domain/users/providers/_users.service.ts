import { DatabaseService } from '@infra/database';
import { AlreadyExistsException } from '@infra/errors';
import { PasswordService } from '@modules/shared';
import { Injectable, Logger } from '@nestjs/common';

import { CreateUserDto } from '../dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly database: DatabaseService,
    private readonly passwordService: PasswordService,
  ) {}

  async create({ email, password, ...payload }: CreateUserDto) {
    const user = await this.database.user.findUnique({ where: { email } });

    if (user) {
      throw new AlreadyExistsException('User', this.logger);
    }

    const hash = await this.passwordService.hashPassword(password);

    return this.database.user.create({
      data: { email, password: hash, ...payload },
    });
  }
}
