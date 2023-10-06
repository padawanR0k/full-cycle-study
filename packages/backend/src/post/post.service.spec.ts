import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { TestDbConfig } from '../../test/test-db.config';
import { PostRepository } from './post.repository';
import { MikroORM } from '@mikro-orm/core';
import { PostModule } from './post.module';

describe('PostService', () => {
  let service: PostService;
  let orm: MikroORM;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestDbConfig, PostModule],
      providers: [PostService, PostRepository],
    }).compile();

    service = module.get<PostService>(PostService);
    /**
     * NOTE
     * orm = MikroORM
     */
    orm = module.get<MikroORM>(MikroORM);
    /**
     * NOTE
     * DB 스키마 초기화(새로고침)
     */
    await orm.getSchemaGenerator().refreshDatabase();
  });

  afterAll(async () => await orm.close(true));

  beforeEach(async () => await orm.getSchemaGenerator().clearDatabase());

  it('업데이트하려는 post가 없는 경우 오류가 발생해야한다.', async () => {
    // given
    const postId = 1;
    const updatePostDto = {
      title: 'test',
      content: 'test',
    };

    await expect(service.update(postId, updatePostDto)).rejects.toThrow();
  });

  it('제거하려는 post가 없는 경우 오류가 발생해야한다.', async () => {
    // given
    const postId = 1;

    await expect(service.remove(postId)).rejects.toThrow();
  });
});
