import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { Configuration } from './core/configs';
import { WorkerModule } from './worker.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configuration = app.get(Configuration);
  const builder = new DocumentBuilder().build();
  const swagger = SwaggerModule.createDocument(app, builder);

  SwaggerModule.setup('docs', app, swagger);

  await NestFactory.createApplicationContext(WorkerModule);
  await app.listen(configuration.port);
}

void bootstrap();
