import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { FileModule } from './file/file.module';
import { CaslModule } from './casl/casl.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CategoriesModule,
    AuthModule,
    UsersModule,
    RolesModule,
    FileModule,
    CaslModule,
    CompanyModule,
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'public'),
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
