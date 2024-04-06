import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
  });
  app.useStaticAssets(join(__dirname, '..', 'upload'), { prefix: '/upload' });

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Documentation')
    .setDescription('Documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      filter: true,
      docExpansion: 'none',
      operationsSorter: 'unsorted',
      tagsSorter: 'alpha',
      showRequestDuration: true,
      displayOperationId: false,
      defaultModelsExpandDepth: 0,
      defaultModelExpandDepth: 1,
    },
  });

  await app.listen(3002);
}
bootstrap();
