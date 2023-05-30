import { SharedModule } from '@modules/shared';
import { Module } from '@nestjs/common';

import { UsersController } from './controller';
import { UsersService } from './providers';

@Module({
  imports: [SharedModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
