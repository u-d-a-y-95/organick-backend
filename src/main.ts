import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configServcie = app.get(ConfigService);

  const apiConfig = new DocumentBuilder()
    .setTitle('Organick')
    .setDescription('A ecommerce site')
    .build();
  const document = SwaggerModule.createDocument(app, apiConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(configServcie.get<number>('PORT'));
}
bootstrap();
