import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UserDB, UserPayload } from './auth.interface';
import { RegisterDto } from './dto/register.dto';
import { User } from 'generated/prisma';
import bcrypt from 'bcrypt';
import { saltOrRounds } from './constants';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private rolesService: RolesService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDB | null> {
    const user = await this.usersService.findOneByEmail({ email });
    if (user) {
      if (user ? await bcrypt.compare(password, user.password) : false) {
        const result = { id: user.id, name: user.name, email: user.email };
        return result;
      }
    }
    return null;
  }

  login(user: UserPayload): { access_token: string } {
    const payload = { id: user.id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }

  async availabeEmail({ email }: { email: string }): Promise<boolean> {
    const user = await this.usersService.findOneByEmail({ email });
    if (user) {
      return false;
    }
    return true;
  }

  async register(user: RegisterDto): Promise<Omit<User, 'password'>> {
    const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);
    user.password = hashedPassword;
    const result = await this.usersService.create({ data: user });
    result.password = '********';
    return result;
  }

  getRoleByUserId(userId: number) {
    return this.rolesService.roleNameByUserId({ userId });
  }
}
