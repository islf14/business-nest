import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { PrismaService } from 'src/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

@Module({
  providers: [
    RolesService,
    PrismaService,
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  exports: [RolesService],
})
export class RolesModule {}
