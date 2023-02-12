import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AppModule } from './app.module';
import { AccessTokenGuards } from './auth/guards/accessToken.guard';
import { RefreshTokenGuard } from './auth/guards/refreshToken.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector)
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalGuards(
    new AccessTokenGuards(reflector),
  )
  app.enableCors()
  await app.listen(4000);
}
bootstrap();
