import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/prisma.service';
import { Company, Prisma } from 'generated/prisma';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CategoriesService } from 'src/categories/categories.service';
import { UsersService } from 'src/users/users.service';
import { FileService } from 'src/file/file.service';

@Injectable()
export class CompaniesService {
  //

  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private categoriesService: CategoriesService,
    private fileService: FileService,
  ) {}

  //

  async create({
    createCompanyDto,
  }: {
    createCompanyDto: CreateCompanyDto;
  }): Promise<Company> {
    const category = await this.categoriesService.findOne({
      id: createCompanyDto.categoryId,
    });
    const user = await this.usersService.findOne({
      id: createCompanyDto.userId,
    });
    if (!user || !category) {
      throw new HttpException('Create company error', HttpStatus.BAD_REQUEST);
    }

    const data: Prisma.CompanyCreateInput = {
      name: createCompanyDto.name,
      email: createCompanyDto.email,
      phone: createCompanyDto.phone,
      address: createCompanyDto.address,
      website: createCompanyDto.website,
      description: createCompanyDto.description,
      photoUrl: createCompanyDto.photoUrl,
      user: { connect: { id: createCompanyDto.userId } },
      category: { connect: { id: createCompanyDto.categoryId } },
    };

    try {
      return await this.prisma.company.create({ data });
    } catch (e: unknown) {
      if (e instanceof Error) console.log('Create company error:', e.message);
      throw new HttpException('Create error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //

  findAll(): Promise<Company[]> {
    return this.prisma.company.findMany({ orderBy: { id: 'asc' } });
  }

  //

  findOne({ id }: { id: number }): Promise<Company | null> {
    return this.prisma.company.findFirst({ where: { id } });
  }

  //

  async update({
    id,
    updateCompanyDto,
  }: {
    id: number;
    updateCompanyDto: UpdateCompanyDto;
  }): Promise<Company> {
    const company = await this.findOne({ id });
    if (!company) {
      throw new HttpException('update error', HttpStatus.BAD_REQUEST);
    }

    const data: Prisma.CompanyUpdateInput = {
      name: updateCompanyDto.name,
      email: updateCompanyDto.email,
      phone: updateCompanyDto.phone,
      address: updateCompanyDto.address,
      website: updateCompanyDto.website,
      description: updateCompanyDto.description,
      photoUrl: updateCompanyDto.photoUrl,
    };

    if (updateCompanyDto.userId && updateCompanyDto.userId !== company.userId) {
      const user = await this.usersService.findOne({
        id: updateCompanyDto.userId,
      });
      if (!user) {
        throw new HttpException('Update company error', HttpStatus.BAD_REQUEST);
      }
      data.user = { connect: { id: updateCompanyDto.userId } };
    }
    if (
      updateCompanyDto.categoryId &&
      updateCompanyDto.categoryId !== company.categoryId
    ) {
      const category = await this.categoriesService.findOne({
        id: updateCompanyDto.categoryId,
      });
      if (!category) {
        throw new HttpException('Create company error', HttpStatus.BAD_REQUEST);
      }
      data.category = { connect: { id: updateCompanyDto.categoryId } };
    }

    try {
      return await this.prisma.company.update({
        where: { id },
        data: data,
      });
    } catch (e: unknown) {
      if (e instanceof Error) console.log('Update error:', e.message);
      throw new HttpException('update error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //

  async remove({ id }: { id: number }): Promise<Company> {
    const company = await this.findOne({ id });
    if (!company) {
      throw new HttpException('remove error', HttpStatus.BAD_REQUEST);
    }
    let deletedCom: Company;
    try {
      deletedCom = await this.prisma.company.delete({ where: { id } });
    } catch (e: unknown) {
      if (e instanceof Error) console.log('Remove error:', e.message);
      throw new HttpException('remove error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (company.photoUrl) {
      await this.fileService.deleteUploadedFile(company.photoUrl);
    }
    return deletedCom;
  }

  //
}
