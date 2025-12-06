import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { corsConfig } from './cors.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { csp } from './csp.config';
import { ecors } from './eCors.config';
import type { Application, Request, Response } from 'express';
// import { port } from './constants';

let server: Application | null = null;

async function bootstrap(): Promise<Application> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors(corsConfig());
  app.use(ecors());
  app.use(csp());

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

  // await app.listen(port);

  // vercel
  await app.init(); // DO NOT LISTEN
  return app.getHttpAdapter().getInstance() as Application;
}
// void bootstrap();

export default async function handler(
  req: Request,
  res: Response,
): Promise<void> {
  if (!server) {
    server = await bootstrap();
  }
  server(req, res);
}
