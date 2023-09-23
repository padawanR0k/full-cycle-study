import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 모든 HTTP 요청에서 직렬화
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // class-transformer와 함께 사용하면 요청 객체를 역직렬화할 수 있다
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(2222);
}
bootstrap();
