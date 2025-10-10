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
  StreamableFile,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Category } from 'generated/prisma';

type dataCategory = {
  category?: Category | null;
  image?: StreamableFile | undefined;
};

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  //

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() photo: Express.Multer.File,
  ): Promise<Category> {
    if (photo) {
      createCategoryDto.photoUrl = photo.filename;
    }
    return this.categoriesService.create(createCategoryDto);
  }

  //

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  //

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findOne(@Param('id') id: number): Promise<dataCategory | null> {
    if (isNaN(Number(id))) {
      throw new HttpException('id must be a number', HttpStatus.BAD_REQUEST);
    }
    const category = await this.categoriesService.findOne({ id });
    let image: StreamableFile | string = '';
    if (category?.photoUrl) {
      image = await this.categoriesService.getImage({
        filename: category.photoUrl,
      });
    }

    let data: dataCategory = {
      category,
    };
    if (image instanceof StreamableFile) {
      data = {
        category,
        image,
      };
    }

    return data;
  }

  //

  @Patch(':id')
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
    return this.categoriesService.update(id, updateCategoryDto);
  }

  //

  @Delete(':id')
  @HttpCode(204)
  @UsePipes(new ValidationPipe({ transform: true }))
  remove(@Param('id') id: number): Promise<Category> {
    if (isNaN(Number(id))) {
      throw new HttpException('id must be a number', HttpStatus.BAD_REQUEST);
    }
    return this.categoriesService.remove({ id });
  }

  //
}
