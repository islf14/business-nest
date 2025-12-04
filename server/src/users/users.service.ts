import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
import { UserDB, UserShow } from 'src/auth/auth.interface';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  //
  constructor(private prisma: PrismaService) {}

  // Find a user

  findOne({ id }: { id: number }): Promise<UserDB | null> {
    return this.prisma.user.findUnique({
      select: { id: true, name: true, email: true, role: true },
      where: { id },
    });
  }

  // Find a user by email

  findOneByEmail({ email }: { email: string }): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  // Create a user

  async create({ data }: { data: Prisma.UserCreateInput }): Promise<UserShow> {
    try {
      return await this.prisma.user.create({
        select: { name: true, email: true, role: true },
        data,
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        const m = e.message.trim().replace(/(\r\n|\n|\r)/gm, '');
        console.error(new Date().toLocaleString() + ' Create user:', m);
      }
      throw new HttpException(
        'The user could not be created',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Find all users (user role)

  findAll(): Promise<UserDB[]> {
    return this.prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true },
      where: { role: 'USER' },
      orderBy: { id: 'asc' },
    });
  }

  // Update a user

  async update({
    id,
    data,
  }: {
    id: number;
    data: Prisma.UserUpdateInput;
  }): Promise<UserDB> {
    const user = await this.findOne({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    const email = data.email as string;
    if (email !== undefined && user.email !== data.email) {
      const exist = await this.findOneByEmail({ email: email });
      if (exist) {
        throw new HttpException('User exists', HttpStatus.BAD_REQUEST);
      }
    }
    try {
      return await this.prisma.user.update({
        select: { id: true, name: true, email: true, role: true },
        where: { id },
        data,
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        const m = e.message.trim().replace(/(\r\n|\n|\r)/gm, '');
        console.error(new Date().toLocaleString() + ' Update user:', m);
      }
      throw new HttpException(
        'The user could not be updated',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Delete a user

  async remove({ id }: { id: number }): Promise<UserDB> {
    const user = await this.findOne({ id });
    if (!user) {
      throw new HttpException('Remove error', HttpStatus.BAD_REQUEST);
    }
    try {
      return await this.prisma.user.delete({
        select: { id: true, name: true, email: true, role: true },
        where: { id },
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        const m = e.message.trim().replace(/(\r\n|\n|\r)/gm, '');
        console.error(new Date().toLocaleString() + ' Remove user:', m);
      }
      throw new HttpException(
        'The user could not be deleted',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //
}
