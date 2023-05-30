import { SharedModule } from '@modules/shared';
import { Module } from '@nestjs/common';

import { UsersController } from './controller';
import { UsersService } from './providers';
import { UserResolver } from './resolvers';

@Module({
  imports: [SharedModule],
  controllers: [UsersController],
  providers: [UsersService, UserResolver],
})
export class UsersModule {}
