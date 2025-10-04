import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard, JwtPayloadUser } from './auth.guard';
import { Public } from './auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIng(@Body() signInDto: Record<string, any>) {
    const username =
      typeof signInDto.username === 'string' ? signInDto.username : '';
    const password =
      typeof signInDto.password === 'string' ? signInDto.password : '';
    return this.authService.signIn(username, password);
  }

  @UseGuards(AuthGuard) // anulated with APP_GUARD in providers
  @Get('profile')
  getProfile(@Request() req: { user: JwtPayloadUser }) {
    return req.user;
  }

  // @Public()
  @Get('hi')
  findAll() {
    return [];
  }
}
