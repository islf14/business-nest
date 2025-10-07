import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  //
  constructor(private prisma: PrismaService) {}

  findOne({ email }: { email: string }): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  create({ data }: { data: Prisma.UserCreateInput }): Promise<User> {
    return this.prisma.user.create({ data });
  }
}
