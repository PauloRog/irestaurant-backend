import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserDto } from '../dto';
import { UsersService } from '../providers';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/')
  create(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }
}
