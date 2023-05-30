import { PartialType } from '@nestjs/swagger';

import { CreateUserDto } from './_create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
