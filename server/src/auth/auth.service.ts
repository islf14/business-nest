import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UserDB, UserPayload, UserShow } from './auth.interface';
import { RegisterDto } from './dto/register.dto';
import bcrypt from 'bcrypt';
import { saltOrRounds } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDB | null> {
    const user = await this.usersService.findOneByEmail({ email });
    if (user) {
      if (user ? await bcrypt.compare(password, user.password) : false) {
        const result = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
        return result;
      }
    }
    return null;
  }

  login(userPayload: UserPayload): { access_token: string } {
    return { access_token: this.jwtService.sign(userPayload) };
  }

  async availabeEmail({ email }: { email: string }): Promise<boolean> {
    const user = await this.usersService.findOneByEmail({ email });
    if (user) {
      return false;
    }
    return true;
  }

  async register(user: RegisterDto): Promise<UserShow> {
    const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);
    user.password = hashedPassword;
    const result = await this.usersService.create({ data: user });
    return result;
  }
}
