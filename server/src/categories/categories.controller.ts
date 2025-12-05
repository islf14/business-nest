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
import { Throttle } from '@nestjs/throttler';
import { FileService } from 'src/file/file.service';

@Controller('categories')
export class CategoriesController {
  //

  constructor(
    private readonly categoriesService: CategoriesService,
    private fileService: FileService,
  ) {}

  // Create - limit 5 every 2 minutes

  @Throttle({ default: { limit: 5, ttl: 120000 } })
  @Post()
  @CheckPolicies(new CreateCategoryPolicyHandler())
  @UseInterceptors(FileInterceptor('photo'))
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() photo: Express.Multer.File,
  ): Promise<Category> {
    if (photo) {
      const photoUrl = await this.fileService.uploadFile(
        photo.buffer,
        photo.originalname,
      );
      if (photoUrl) {
        createCategoryDto.photoUrl = photoUrl;
      }
    }
    return this.categoriesService.create({ createCategoryDto });
  }

  // Find all categories

  @Get()
  @CheckPolicies(new ReadCategoryPolicyHandler())
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  // Find a category

  @Get(':id')
  @CheckPolicies(new ReadCategoryPolicyHandler())
  @UsePipes(new ValidationPipe({ transform: true }))
  async findOne(@Param('id') id: number): Promise<Category | null> {
    if (isNaN(Number(id))) {
      throw new HttpException('id must be a number', HttpStatus.BAD_REQUEST);
    }
    return this.categoriesService.findOne({ id });
  }

  // Update a category

  @Throttle({ default: { limit: 10, ttl: 120000 } })
  @Patch(':id')
  @CheckPolicies(new UpdateCategoryPolicyHandler())
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(FileInterceptor('photo'))
  async update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFile() photo: Express.Multer.File,
  ): Promise<Category> {
    if (isNaN(Number(id))) {
      throw new HttpException('id must be a number', HttpStatus.BAD_REQUEST);
    }
    if (photo) {
      const photoUrl = await this.fileService.uploadFile(
        photo.buffer,
        photo.originalname,
      );
      if (photoUrl) {
        updateCategoryDto.photoUrl = photoUrl;
      }
    }
    return this.categoriesService.update({ id, updateCategoryDto });
  }

  // Delete category

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
