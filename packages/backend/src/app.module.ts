import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from "./config/app.config";


@Module({
  imports: [
    /**
     * https://www.daleseo.com/nestjs-configuration/
     */
    ConfigModule.forRoot({
      // 속도 측면
      cache: true,
      // 다른 모듈에서 주입받아 사용
      isGlobal: true,
      ignoreEnvFile: false,
      load: [appConfig],
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
