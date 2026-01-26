import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { Configuration } from './configs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configuration = app.get(Configuration);

  await app.listen(configuration.port);
}

void bootstrap();
