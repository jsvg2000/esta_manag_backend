import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder  } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Adminitración de Establecimientos')
    .setDescription('Administracion de establecimiento, cmerciantes y usuarios')
    .setVersion('0.1')
    .addBearerAuth({
      type:'http',
      scheme:'bearer',
      bearerFormat:'JWT',
      in:'header',
      name:'Authorization',
      description:'Enter your Bearer token'
    })
    .addSecurityRequirements('bearer')
    .build()

  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('doc-api',app,document);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: false,
    forbidNonWhitelisted: true,
    transform: true,
  }));



  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
