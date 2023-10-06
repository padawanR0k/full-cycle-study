import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: ['./dist/**/entities/*.entity.js'],
      entitiesTs: ['./src/**/entities/*.entity.ts'],
      dbName: 'test',
      type: 'postgresql',
      password: 'postgres',
      user: 'postgres',
      debug: false,
      allowGlobalContext: true,
    }),
  ],
})
export class TestDbConfig {}
