import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  HttpCode,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CheckPolicies } from 'src/casl/decorators/policies.decorator';
import {
  CreateCompanyPolicyHandler,
  DeleteCompanyPolicyHandler,
  ReadCompanyPolicyHandler,
  UpdateCompanyPolicyHandler,
} from 'src/casl/casl.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { Company } from 'generated/prisma';

@Controller('companies')
export class CompaniesController {
  //

  constructor(private readonly companiesService: CompaniesService) {}

  //

  @Post()
  @CheckPolicies(new CreateCompanyPolicyHandler())
  @UseInterceptors(FileInterceptor('photo'))
  create(
    @Body() createCompanyDto: CreateCompanyDto,
    @UploadedFile() photo: Express.Multer.File,
  ): Promise<Company> {
    if (photo) {
      createCompanyDto.photoUrl = photo.filename;
    }
    return this.companiesService.create({ createCompanyDto });
  }

  //

  @Get()
  @CheckPolicies(new ReadCompanyPolicyHandler())
  findAll(): Promise<Company[]> {
    return this.companiesService.findAll();
  }

  //

  @Get(':id')
  @CheckPolicies(new ReadCompanyPolicyHandler())
  @UsePipes(new ValidationPipe({ transform: true }))
  findOne(@Param('id') id: number) {
    if (isNaN(Number(id))) {
      throw new HttpException('id must be a number', HttpStatus.BAD_REQUEST);
    }
    return this.companiesService.findOne({ id });
  }

  //

  @Patch(':id')
  @CheckPolicies(new UpdateCompanyPolicyHandler())
  @UseInterceptors(FileInterceptor('photo'))
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param('id') id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    if (isNaN(Number(id))) {
      throw new HttpException('id must be a number', HttpStatus.BAD_REQUEST);
    }
    if (photo) {
      updateCompanyDto.photoUrl = photo.filename;
    }
    return this.companiesService.update({ id, updateCompanyDto });
  }

  //

  @Delete(':id')
  @HttpCode(204)
  @CheckPolicies(new DeleteCompanyPolicyHandler())
  @UsePipes(new ValidationPipe({ transform: true }))
  remove(@Param('id') id: number) {
    if (isNaN(Number(id))) {
      throw new HttpException('id must be a number', HttpStatus.BAD_REQUEST);
    }
    return this.companiesService.remove({ id });
  }

  //
}
