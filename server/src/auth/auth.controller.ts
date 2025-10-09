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
import { Public } from './auth.decorator';
import { LocalAuthGuard } from './local-auth.guard';
import { UserDB, UserPayload } from './auth.interface';
import { RegisterDto } from './dto/register.dto';
import { User } from 'generated/prisma';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: { user: UserDB }): Promise<any> {
    const userPayload: UserPayload = {
      id: req.user.id,
      email: req.user.email,
    };
    const { access_token } = this.authService.login(userPayload);
    const role = await this.authService.getRoleByUserId(req.user.id);

    const data = {
      user: req.user,
      role,
      token: access_token,
    };
    return data;
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
