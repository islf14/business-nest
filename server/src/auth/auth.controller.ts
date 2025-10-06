import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';
import { LocalAuthGuard } from './local-auth.guard';
import { UserDB } from './auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: { user: UserDB }): any {
    return this.authService.login(req.user);
  }

  // @UseGuards(AuthGuard) // anulated with APP_GUARD in providers
  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: { user: UserDB }): any {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('logout')
  logout(@Request() req: { logout: () => void }): any {
    return req.logout();
  }
}
