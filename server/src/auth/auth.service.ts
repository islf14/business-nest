import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UserDB } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  validateUser(username: string, pass: string): UserDB | null {
    const user = this.usersService.findOne(username);
    if (user && user.password === pass) {
      const result = { userId: user.userId, username: user.username };
      return result;
    }
    return null;
  }

  login(user: UserDB): { access_token: string } {
    const payload = { username: user.username, sub: user.userId };
    return { access_token: this.jwtService.sign(payload) };
  }
}
