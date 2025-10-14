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
import { UserDB, UserPayload } from './auth.interface';
import { RegisterDto } from './dto/register.dto';
import { User } from 'generated/prisma';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { Role } from 'src/roles/enums/role.enum';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: { user: UserDB }): Promise<any> {
    const role = await this.authService.getRoleByUserId(req.user.id);
    const userPayload: UserPayload = {
      id: req.user.id,
      email: req.user.email,
      role: role?.name ?? 'unknown',
    };
    const { access_token } = this.authService.login(userPayload);

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
  @Roles(Role.Admin)
  getProfile(@Request() req: { user: UserPayload }): any {
    return req.user;
  }

  @Post('logout')
  logout(@Request() req: { logout: () => void }): any {
    return req.logout();
  }
}
