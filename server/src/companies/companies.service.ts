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

  // Create a company

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
      throw new HttpException('User or category error', HttpStatus.BAD_REQUEST);
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
      if (e instanceof Error) {
        const m = e.message.trim().replace(/(\r\n|\n|\r)/gm, '');
        console.error(new Date().toLocaleString() + ' Create company:', m);
      }
      throw new HttpException(
        'The company could not be create',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Find All companies

  findAll(): Promise<Company[]> {
    return this.prisma.company.findMany({ orderBy: { id: 'asc' } });
  }

  // Find one company

  findOne({ id }: { id: number }): Promise<Company | null> {
    return this.prisma.company.findFirst({ where: { id } });
  }

  // Update a company

  async update({
    id,
    updateCompanyDto,
  }: {
    id: number;
    updateCompanyDto: UpdateCompanyDto;
  }): Promise<Company> {
    // Check if the company exists
    const company = await this.findOne({ id });
    if (!company) {
      throw new HttpException('Company not found', HttpStatus.BAD_REQUEST);
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

    // Check if the user exists
    if (updateCompanyDto.userId && updateCompanyDto.userId !== company.userId) {
      const user = await this.usersService.findOne({
        id: updateCompanyDto.userId,
      });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
      }
      data.user = { connect: { id: updateCompanyDto.userId } };
    }

    // Check if the category exists
    if (
      updateCompanyDto.categoryId &&
      updateCompanyDto.categoryId !== company.categoryId
    ) {
      const category = await this.categoriesService.findOne({
        id: updateCompanyDto.categoryId,
      });
      if (!category) {
        throw new HttpException('Category not found', HttpStatus.BAD_REQUEST);
      }
      data.category = { connect: { id: updateCompanyDto.categoryId } };
    }

    try {
      const result = await this.prisma.company.update({
        where: { id },
        data: data,
      });
      if (company.photoUrl && updateCompanyDto.photoUrl) {
        await this.fileService.deleteUploadedFile(company.photoUrl);
      }
      return result;
    } catch (e: unknown) {
      if (e instanceof Error) {
        const m = e.message.trim().replace(/(\r\n|\n|\r)/gm, '');
        console.error(new Date().toLocaleString() + ' Update company:', m);
      }
      throw new HttpException(
        'The company could not be updated',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Delete a company

  async remove({ id }: { id: number }): Promise<Company> {
    const company = await this.findOne({ id });
    if (!company) {
      throw new HttpException('Company not found', HttpStatus.BAD_REQUEST);
    }
    let deletedCom: Company;
    try {
      deletedCom = await this.prisma.company.delete({ where: { id } });
    } catch (e: unknown) {
      if (e instanceof Error) {
        const m = e.message.trim().replace(/(\r\n|\n|\r)/gm, '');
        console.error(new Date().toLocaleString() + ' Remove company:', m);
      }
      throw new HttpException(
        'The company could not be deleted',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (company.photoUrl) {
      await this.fileService.deleteUploadedFile(company.photoUrl);
    }
    return deletedCom;
  }

  //
}
