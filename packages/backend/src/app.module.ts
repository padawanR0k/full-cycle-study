import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './blog/post.module';
import appConfig from './config/app.config';
import { MikroOrmModule } from '@mikro-orm/nestjs';

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
    }),
    // mikro-orm.config.ts 파일을 따로 선언하는 방법도 있지만, 트리세이킹을 하는 경우 제대로 동작하지 않는다고 한다.
    // https://docs.nestjs.com/recipes/mikroorm
    MikroOrmModule.forRoot({
      entities: ['./dist/**/entities/*.entity.js'],
      entitiesTs: ['./src/**/entities/*.entity.ts'],
      dbName: 'postgres',
      type: 'postgresql',
      password: 'postgres',
      user: 'postgres',
      debug: true,
    }),
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
