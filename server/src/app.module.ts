import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'node:path';
import { FileController } from './file/file.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CategoriesModule,
    AuthModule,
    UsersModule,
    RolesModule,
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'public'),
    // }),
  ],
  controllers: [AppController, FileController],
  providers: [AppService],
})
export class AppModule {}
