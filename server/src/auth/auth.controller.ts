import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './local-auth.guard';
import { UserDB, UserPayload, UserShow } from './auth.interface';
import { RegisterDto } from './dto/register.dto';
import { $Enums } from 'generated/prisma';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Throttle({ default: { limit: 4, ttl: 120000 } })
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: { user: UserDB }): any {
    const userPayload: UserPayload = {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
    };
    const { access_token } = this.authService.login(userPayload);

    const userShow: UserShow = {
      email: req.user.email,
      name: req.user.name,
      role: req.user.role,
    };
    const data = {
      user: userShow,
      token: access_token,
    };
    return data;
  }

  @Public()
  @Throttle({ default: { limit: 2, ttl: 120000 } })
  @Post('register')
  async register(@Body() body: RegisterDto): Promise<UserShow> {
    const isAvailable = await this.authService.availabeEmail({
      email: body.email,
    });
    if (!isAvailable) {
      throw new HttpException('Try a different email address', 400);
    }
    return this.authService.register(body);
  }

  // @UseGuards(AuthGuard) and (JwtAuthGuard) // anulated with APP_GUARD in providers
  @Get('profile')
  @Roles($Enums.Role.ADMIN)
  getProfile(@Request() req: { user: UserPayload }): any {
    return req.user;
  }

  @Post('logout')
  logout(@Request() req: { logout: () => void }): any {
    return req.logout();
  }
}
