import { PartialType } from '@nestjs/mapped-types';

import { CreateUserDto } from './_create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
