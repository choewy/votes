import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { Configuration } from './core/configs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configuration = app.get(Configuration);
  const builder = new DocumentBuilder().build();
  const swagger = SwaggerModule.createDocument(app, builder);

  SwaggerModule.setup('docs', app, swagger);

  await app.listen(configuration.port);
}

void bootstrap();
