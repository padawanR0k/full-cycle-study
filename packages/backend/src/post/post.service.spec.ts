import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { TestDbConfig } from '../../test/test-db.config';
import { PostRepository } from './post.repository';
import { EntityManager, MikroORM } from '@mikro-orm/core';
import { PostModule } from './post.module';
import { Post } from './entities/post.entity';

describe('PostService', () => {
  let service: PostService;
  let em: EntityManager;
  let orm: MikroORM;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestDbConfig, PostModule],
      providers: [PostService, PostRepository],
    }).compile();

    /**
     * NOTE
     * orm = MikroORM
     */
    orm = module.get<MikroORM>(MikroORM);
    /**
     * NOTE
     * DB 스키마 초기화(새로고침) - 테이블 스키마를 생성해준다.
     */
    await orm.getSchemaGenerator().refreshDatabase();
    service = module.get<PostService>(PostService);
    em = orm.em.fork();
  });

  // 연결을 끊는다
  afterAll(async () => await orm.close(true));

  // 테스트마다 테이블을 비운다.
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

  it('post 목록 조회시 삭제된 post는 조회되지 않아야한다.', async () => {
    // given
    const createPostDto = {
      title: 'test',
      content: 'test',
      deletedAt: '2023-01-01 00:00:00',
    };

    const newPost = em.create(Post, createPostDto);
    await em.persistAndFlush(newPost);

    // when
    const posts = await service.findAll();

    // then
    expect(posts.length).toBe(0);
  });

  it('post 상세 조회시 삭제된 post는 조회되지 않아야한다.', async () => {
    // given
    const createPostDto = {
      title: 'test',
      content: 'test',
      deletedAt: '2023-01-01 00:00:00',
    };

    const newPost = em.create(Post, createPostDto);
    await em.persistAndFlush(newPost);

    // when, then
    await expect(service.findOne(newPost.id)).rejects.toThrow();
  });

  it('post 목록 조회시 삭제되지 않은 post는 조회된다.', async () => {
    // given
    const createPostDto = {
      title: 'ASDASDSA',
      content: 'ASDASD',
    };

    await service.create(createPostDto);

    // when;
    const posts = await service.findAll();

    // then
    expect(posts.length).toBe(1);
  });
});
