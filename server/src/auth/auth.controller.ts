import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';
import { LocalAuthGuard } from './local-auth.guard';
import { UserPayload } from './auth.interface';
import { RegisterDto } from './dto/register.dto';
import { User } from 'generated/prisma';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: { user: UserPayload }): { access_token: string } {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('register')
  async register(@Body() body: RegisterDto): Promise<Omit<User, 'password'>> {
    const isAvailable = await this.authService.availabeEmail({
      email: body.email,
    });
    if (!isAvailable) {
      throw new HttpException('email already exists', 400);
    }
    return this.authService.register(body);
  }

  // @UseGuards(AuthGuard) and (JwtAuthGuard) // anulated with APP_GUARD in providers
  @Get('profile')
  getProfile(@Request() req: { user: UserPayload }): any {
    return req.user;
  }

  @Post('logout')
  logout(@Request() req: { logout: () => void }): any {
    return req.logout();
  }
}
