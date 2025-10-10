import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaService } from 'src/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './public/uploads',
        filename: (_req, file, cb) => {
          cb(null, Date.now() + '-' + file.originalname);
        },
      }),
    }),
    FileModule,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService],
})
export class CategoriesModule {}
