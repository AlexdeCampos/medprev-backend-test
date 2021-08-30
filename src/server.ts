import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { createConnection } from 'typeorm';
import { description, name, version } from '../package.json';
import { AppModule } from './app.module';
async function bootstrap() {
  await createConnection()
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .build();

  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'MedPrev Api Documentation',
  };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, customOptions);

  await app.listen(3000);
}

bootstrap();