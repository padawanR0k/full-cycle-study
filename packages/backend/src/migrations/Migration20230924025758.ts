import { Migration } from '@mikro-orm/migrations';

export class Migration20230924025758 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "post" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null, "content" varchar(255) not null, "deleted_at" timestamptz(0) null);',
    );

    this.addSql(
      `INSERT INTO public.post (id, content, title, updated_at, created_at, deleted_at) VALUES (2, 'asd', 'title111', '2023-09-10', '2023-09-10', null);`,
    );
    this.addSql(
      `INSERT INTO public.post (id, content, title, updated_at, created_at, deleted_at) VALUES (1, 'asd', 'title111', '2023-09-23', '2023-09-23', '2023-09-23');`,
    );
    this.addSql(
      `INSERT INTO public.post (id, content, title, updated_at, created_at, deleted_at) VALUES (3, 'asd', 'title111', '2023-09-23', '2023-09-23', '2023-09-23');`,
    );
    this.addSql(
      `INSERT INTO public.post (id, content, title, updated_at, created_at, deleted_at) VALUES (4, 'asd', 'title111', '2023-09-23', '2023-09-23', '2023-09-23');`,
    );
  }
}
