import { Injectable } from '@nestjs/common';
// import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma.service';
import { Category, Prisma } from 'generated/prisma';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  create(createCategoryDto: Prisma.CategoryCreateInput): Promise<Category> {
    return this.prisma.category.create({ data: createCategoryDto });
  }

  findAll(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  findOne(id: number): Promise<Category | null> {
    return this.prisma.category.findFirst({ where: { id } });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    console.log(updateCategoryDto);
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
