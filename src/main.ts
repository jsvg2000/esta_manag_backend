import { NestFactory } from '@nestjs/core';
import { MerchantsModule } from './merchants/merchants.module';
import { SwaggerModule, DocumentBuilder  } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(MerchantsModule);

  const config = new DocumentBuilder()
    .setTitle('API Adminitración de Establecimientos')
    .setDescription('Administracion de establecimiento, cmerciantes y usuarios')
    .setVersion('0.1')
    .build()

  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('doc-api',app,document);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
