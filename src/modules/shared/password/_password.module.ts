import { Module } from '@nestjs/common';

import { PasswordService } from './providers';

@Module({
  providers: [PasswordService],
  exports: [PasswordService],
})
export class PasswordModule {}
