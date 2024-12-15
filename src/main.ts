import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const defaultPort = process.env.DEFAULT_PORT || 3000;
  const app = await NestFactory.create(AppModule, { cors: true });
  console.log(`Server is running on port ${defaultPort}`);
  const config = new DocumentBuilder()
    .setTitle('Inipod Pokemon API Documentation')
    .setDescription('The')
    .setVersion('1.0')
    .build();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);
  console.log(
    `Swagger is running on port http://localhost:${defaultPort}/swagger`,
  );
  await app.listen(defaultPort);
  app.enableCors({
    origin: '*', // Allow all origins
    methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Allowed headers
  });
}
bootstrap();
