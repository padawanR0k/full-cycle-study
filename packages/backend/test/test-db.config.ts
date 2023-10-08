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
      registerRequestContext: false,
      // We enable the global context usage in our specs so we don't have to keep forking the EM.
      allowGlobalContext: true,
      implicitTransactions: false,
    }),
  ],
})
export class TestDbConfig {}
