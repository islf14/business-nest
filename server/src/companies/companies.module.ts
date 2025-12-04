import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { PrismaService } from 'src/prisma.service';
import { CategoriesModule } from 'src/categories/categories.module';
import { UsersModule } from 'src/users/users.module';
import { FileModule } from 'src/file/file.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    UsersModule,
    CategoriesModule,
    // Multer does't work in app.module
    MulterModule.register({
      storage: diskStorage({
        destination: './public/uploads',
        filename: (_req, file, cb) => {
          cb(null, Date.now() + '-' + file.originalname);
        },
      }),
      limits: {
        fileSize: 350 * 1024, // 350 KB in bytes
      },
    }),
    FileModule,
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService, PrismaService],
  exports: [],
})
export class CompaniesModule {}
