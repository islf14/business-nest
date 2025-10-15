import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
import { UserDB } from 'src/auth/auth.interface';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  //
  constructor(private prisma: PrismaService) {}

  findOne({ id }: { id: number }): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findOneByEmail({ email }: { email: string }): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create({ data }: { data: Prisma.UserCreateInput }): Promise<User> {
    try {
      return await this.prisma.user.create({ data });
    } catch (e: unknown) {
      if (e instanceof Error) console.log('Create error:', e.message);
      throw new HttpException('Create error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll(): Promise<UserDB[]> {
    return this.prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true },
      orderBy: { id: 'asc' },
    });
  }

  async update({
    id,
    data,
  }: {
    id: number;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const user = await this.findOne({ id });
    if (!user) {
      throw new HttpException('Update error', HttpStatus.BAD_REQUEST);
    }
    try {
      return await this.prisma.user.update({ where: { id }, data });
    } catch (e: unknown) {
      if (e instanceof Error) console.log('Update error:', e.message);
      throw new HttpException('Update error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove({ id }: { id: number }): Promise<User> {
    const user = await this.findOne({ id });
    if (!user) {
      throw new HttpException('Remove error', HttpStatus.BAD_REQUEST);
    }
    try {
      return await this.prisma.user.delete({ where: { id } });
    } catch (e: unknown) {
      if (e instanceof Error) console.log('Remove error:', e.message);
      throw new HttpException('Remove error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
