import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import { logger } from "./logger/logger.middleware";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
dotenv.config();

async function bootstrap() {
  admin.initializeApp({
    credential:admin.credential.cert({
      privateKey:process.env.FIREBASE_PRIVATE_KEY,
      projectId:process.env.FIREBASE_PROJECT_ID,
      clientEmail:process.env.FIREBASE_CLIENT_EMAIL
    })
  })
  const app = await NestFactory.create(AppModule);

  // global logger
  app.use(logger)

  // swagger openApi
  const config = new DocumentBuilder()
    .setTitle('Code-Test')
    .setDescription('The codeTest API description')
    .setVersion('1.0')
    .addTag('codeTest')
    .addBearerAuth( )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
