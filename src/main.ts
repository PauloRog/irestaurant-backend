import { environments } from '@infra/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './_app.module';

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('IRestaurant application')
    .setDescription('An application for restaurant management')
    .setVersion('1.0')
    .addTag('restaurant')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/documentation', app, document);
  await app.listen(environments().APP.PORT);
})();
