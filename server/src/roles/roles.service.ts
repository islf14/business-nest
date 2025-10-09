import { Injectable } from '@nestjs/common';
import { Role } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RolesService {
  //
  constructor(private prismaService: PrismaService) {}

  //

  async roleNameByUserId({ userId }: { userId: number }): Promise<Role | null> {
    const role = await this.prismaService.userHasRole.findFirst({
      include: { role: true },
      where: { userId },
    });
    if (role) {
      return role.role;
    }
    return null;
  }
}
