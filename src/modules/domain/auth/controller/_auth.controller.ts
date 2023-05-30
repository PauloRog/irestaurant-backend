import { Public } from '@infra/decorators';
import { LocalAuthGuard } from '@infra/guards';
import { Controller, Post, Req, UseGuards } from '@nestjs/common';

import { AuthService } from '../providers';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() request) {
    return this.authService.login(request.user);
  }
}
