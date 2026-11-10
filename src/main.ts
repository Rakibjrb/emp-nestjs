import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ResponseInterceptor } from './common/response.interceptor.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(process.env.PORT ?? 8000);
  console.log('Application Running ,,,,/');
}
await bootstrap();
