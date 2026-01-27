import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { Configuration } from '@libs/core';

import { ApiModule } from './api.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
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

  await app.listen(configuration.port);
}

void bootstrap();
