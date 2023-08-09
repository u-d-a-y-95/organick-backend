import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configServcie = app.get(ConfigService);

  const apiConfig = new DocumentBuilder()
    .setTitle('Organick')
    .setDescription('A ecommerce site')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, apiConfig);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  await app.listen(configServcie.get<number>('PORT'));
}
bootstrap();
