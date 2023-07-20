import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configServcie = app.get(ConfigService);
  await app.listen(configServcie.get<number>('PORT'));
}
bootstrap();
