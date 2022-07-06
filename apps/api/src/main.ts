require('dotenv').config();

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const port = process.env.ANALYTICS_PORT || 3333;
  const app = await NestFactory.create(AppModule, { cors: true });
  const globalPrefix = 'api';

  app.use(helmet()); // Set security related headers

  app.setGlobalPrefix(globalPrefix);
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
