import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { MyExceptionsFilter } from './utils/exception-handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalFilters(new MyExceptionsFilter())
  
  app.enableCors()
  await app.listen(3000);
}
bootstrap();
