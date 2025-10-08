import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

export type StaticOrigin =
  | boolean
  | string
  | RegExp
  | Array<boolean | string | RegExp>;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const ACCEPTED_ORIGINS = ['http://localhost:5173', 'http://localhost:4173/'];
  const whitelist: string[] = ACCEPTED_ORIGINS;
  app.enableCors({
    origin: function (
      origin: string | undefined,
      callback: (err: Error | null, origin?: StaticOrigin) => void,
    ) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  });

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
