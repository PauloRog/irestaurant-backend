import { CurrentUser, Public } from '@infra/decorators';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from '../dto';
import { UsersService } from '../providers';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  create(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }

  @Get('/me')
  me(@CurrentUser() { id }) {
    return this.usersService.findById(id);
  }

  @Get()
  findMany(@Query() query: UpdateUserDto) {
    return this.usersService.findMany(query);
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.usersService.update(id, data);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
