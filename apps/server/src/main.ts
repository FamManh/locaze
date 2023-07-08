import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AllConfigType } from './config/config.type';
import { setupSwagger } from './setup-swagger';
import validationOptions from './utils/validation-options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<AllConfigType>);
  const apiPrefix = configService.getOrThrow('app.apiPrefix', { infer: true });
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.setGlobalPrefix(apiPrefix, {
    exclude: ['/'],
  });

  const isEnableDocumentation = configService.get('app.enableDocumentation', {
    infer: true,
  });
  if (isEnableDocumentation) {
    setupSwagger(app, `${apiPrefix}/docs`);
  }
  await app.listen(configService.getOrThrow('app.port', { infer: true }));
}
bootstrap();
