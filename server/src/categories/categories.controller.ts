import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  HttpCode,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Category } from 'generated/prisma';
import { CheckPolicies } from 'src/casl/decorators/policies.decorator';
import {
  CreateCategoryPolicyHandler,
  DeleteCategoryPolicyHandler,
  ReadCategoryPolicyHandler,
  UpdateCategoryPolicyHandler,
} from 'src/casl/casl.interface';

@Controller('categories')
export class CategoriesController {
  //

  constructor(private readonly categoriesService: CategoriesService) {}

  //

  @Post()
  @CheckPolicies(new CreateCategoryPolicyHandler())
  @UseInterceptors(FileInterceptor('photo'))
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() photo: Express.Multer.File,
  ): Promise<Category> {
    if (photo) {
      createCategoryDto.photoUrl = photo.filename;
    }
    return this.categoriesService.create({ createCategoryDto });
  }

  //

  @Get()
  @CheckPolicies(new ReadCategoryPolicyHandler())
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  //

  @Get(':id')
  @CheckPolicies(new ReadCategoryPolicyHandler())
  @UsePipes(new ValidationPipe({ transform: true }))
  async findOne(@Param('id') id: number): Promise<Category | null> {
    if (isNaN(Number(id))) {
      throw new HttpException('id must be a number', HttpStatus.BAD_REQUEST);
    }
    return this.categoriesService.findOne({ id });
  }

  //

  @Patch(':id')
  @CheckPolicies(new UpdateCategoryPolicyHandler())
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(FileInterceptor('photo'))
  update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFile() photo: Express.Multer.File,
  ): Promise<Category> {
    if (isNaN(Number(id))) {
      throw new HttpException('id must be a number', HttpStatus.BAD_REQUEST);
    }
    if (photo) {
      updateCategoryDto.photoUrl = photo.filename;
    }
    return this.categoriesService.update({ id, updateCategoryDto });
  }

  //

  @Delete(':id')
  @HttpCode(204)
  @CheckPolicies(new DeleteCategoryPolicyHandler())
  @UsePipes(new ValidationPipe({ transform: true }))
  remove(@Param('id') id: number): Promise<Category> {
    if (isNaN(Number(id))) {
      throw new HttpException('id must be a number', HttpStatus.BAD_REQUEST);
    }
    return this.categoriesService.remove({ id });
  }

  //
}
