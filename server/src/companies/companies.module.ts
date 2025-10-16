import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { PrismaService } from 'src/prisma.service';
import { CategoriesModule } from 'src/categories/categories.module';
import { UsersModule } from 'src/users/users.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [UsersModule, CategoriesModule, FileModule],
  controllers: [CompaniesController],
  providers: [CompaniesService, PrismaService],
  exports: [],
})
export class CompaniesModule {}
