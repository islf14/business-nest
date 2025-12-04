import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Category, Prisma } from 'generated/prisma';
import { FileService } from 'src/file/file.service';

@Injectable()
export class CategoriesService {
  //
  constructor(
    private prisma: PrismaService,
    private fileService: FileService,
  ) {}

  // Create a company

  async create({
    createCategoryDto,
  }: {
    createCategoryDto: Prisma.CategoryCreateInput;
  }): Promise<Category> {
    try {
      return await this.prisma.category.create({ data: createCategoryDto });
    } catch (e: unknown) {
      if (e instanceof Error) {
        const m = e.message.trim().replace(/(\r\n|\n|\r)/gm, '');
        console.error(new Date().toLocaleString() + ' Create category:', m);
      }
      throw new HttpException(
        'The category could not be created',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Find all categories

  findAll(): Promise<Category[]> {
    return this.prisma.category.findMany({ orderBy: { id: 'asc' } });
  }

  // Find a category

  findOne({ id }: { id: number }): Promise<Category | null> {
    return this.prisma.category.findFirst({ where: { id } });
  }

  // Update a category

  async update({
    id,
    updateCategoryDto,
  }: {
    id: number;
    updateCategoryDto: Prisma.CategoryUpdateInput;
  }): Promise<Category> {
    const category = await this.findOne({ id });
    if (!category) {
      throw new HttpException('Category not found', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.prisma.category.update({
        where: { id },
        data: updateCategoryDto,
      });
      if (category.photoUrl && updateCategoryDto.photoUrl) {
        await this.fileService.deleteUploadedFile(category.photoUrl);
      }
      return result;
    } catch (e: unknown) {
      if (e instanceof Error) {
        const m = e.message.trim().replace(/(\r\n|\n|\r)/gm, '');
        console.error(new Date().toLocaleString() + ' Update category:', m);
      }
      throw new HttpException(
        'The category could not be updated',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Delete a category

  async remove({ id }: { id: number }): Promise<Category> {
    const category = await this.findOne({ id });
    if (!category) {
      throw new HttpException('Category not found', HttpStatus.BAD_REQUEST);
    }
    let deletedCat: Category;
    try {
      deletedCat = await this.prisma.category.delete({ where: { id } });
    } catch (e: unknown) {
      if (e instanceof Error) {
        const m = e.message.trim().replace(/(\r\n|\n|\r)/gm, '');
        console.error(new Date().toLocaleString() + ' Remove category:', m);
      }
      throw new HttpException(
        'The category could not be deleted',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (category.photoUrl) {
      await this.fileService.deleteUploadedFile(category.photoUrl);
    }
    return deletedCat;
  }

  //
}
