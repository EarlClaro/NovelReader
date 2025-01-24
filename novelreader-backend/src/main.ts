import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS
  app.enableCors();

  // Serve static assets (uploads folder)
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',  // URL prefix for static files
  });

  // Start the server on port 3001
  await app.listen(3001);
}

bootstrap();
