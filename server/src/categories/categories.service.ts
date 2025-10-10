import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Category, Prisma } from 'generated/prisma';

@Injectable()
export class CategoriesService {
  //
  constructor(private prisma: PrismaService) {}

  //

  async create(
    createCategoryDto: Prisma.CategoryCreateInput,
  ): Promise<Category> {
    try {
      return await this.prisma.category.create({ data: createCategoryDto });
    } catch (e: unknown) {
      if (e instanceof Error) console.log('Create error:', e.message);
      throw new HttpException('Create error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //

  findAll(): Promise<Category[]> {
    return this.prisma.category.findMany({ orderBy: { id: 'asc' } });
  }

  //

  findOne({ id }: { id: number }): Promise<Category | null> {
    return this.prisma.category.findFirst({ where: { id } });
  }

  //

  async update(
    id: number,
    updateCategoryDto: Prisma.CategoryUpdateInput,
  ): Promise<Category> {
    const cat = await this.findOne({ id });
    if (!cat) {
      throw new HttpException('update error', HttpStatus.BAD_REQUEST);
    }
    try {
      return await this.prisma.category.update({
        where: { id },
        data: updateCategoryDto,
      });
    } catch (e: unknown) {
      if (e instanceof Error) console.log('Update error:', e.message);
      throw new HttpException('update error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //

  async remove({ id }: { id: number }): Promise<Category> {
    const cat = await this.findOne({ id });
    if (!cat) {
      throw new HttpException('remove error', HttpStatus.BAD_REQUEST);
    }
    try {
      return await this.prisma.category.delete({ where: { id } });
    } catch (e: unknown) {
      if (e instanceof Error) console.log('Remove error:', e.message);
      throw new HttpException('remove error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //
}
