import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { Configuration } from './core/configs';
import { WorkerModule } from './worker.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configuration = app.get(Configuration);
  const builder = new DocumentBuilder()
    .setTitle(process.env.npm_package_name as string)
    .setVersion(process.env.npm_package_version as string)
    .addApiKey({ type: 'apiKey', in: 'header' }, 'x-request-id')
    .addBearerAuth({ type: 'http', in: 'header' }, 'authorization')
    .addSecurityRequirements('x-request-id')
    .addSecurityRequirements('authorization')
    .build();

  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, builder));

  await NestFactory.createApplicationContext(WorkerModule);
  await app.listen(configuration.port);
}

void bootstrap();
