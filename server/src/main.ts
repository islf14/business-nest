import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { corsConfig } from './cors.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { csp } from './csp.config';
import { ecors } from './eCors.config';
import { port } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors(corsConfig());
  app.use(ecors());
  app.use(csp());

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Business directory')
    .setDescription(
      'Here we can register users, also companies and their categories.',
    )
    .setVersion('1.0')
    .addTag('Business')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(port);
}
void bootstrap();
