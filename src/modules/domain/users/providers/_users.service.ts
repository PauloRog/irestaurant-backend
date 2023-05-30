import { DatabaseService } from '@infra/database';
import { AlreadyExistsException, NotFoundException } from '@infra/errors';
import { ConnectionType } from '@infra/utils';
import { PasswordService } from '@modules/shared';
import { Injectable, Logger } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from '../dto';

type FindMany = {
  search?: string;
  name?: string;
  email?: string;
  connectionType?: ConnectionType;
};

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

  async update(id: string, payload: UpdateUserDto) {
    if (payload.password) {
      payload.password = await this.passwordService.hashPassword(
        payload.password,
      );
    }

    return this.database.user.update({ where: { id }, data: payload });
  }

  async findById(id: string) {
    const user = await this.database.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User', id, this.logger);
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.database.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException('User', email, this.logger);
    }

    return user;
  }

  async findMany({ name, email, connectionType, search }: FindMany) {
    return this.database.user.findMany({
      where: {
        AND: [
          name && { name },
          email && { email },
          connectionType && { connectionType },
          search && { name: { contains: search, mode: 'insensitive' } },
        ],
      },
    });
  }

  async delete(id: string) {
    return this.database.user.delete({ where: { id } });
  }
}
