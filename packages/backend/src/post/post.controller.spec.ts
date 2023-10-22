import { EntityManager, MikroORM } from '@mikro-orm/core';
import { PostRepository } from './post.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { TestDbConfig } from '../../test/test-db.config';
import { PostModule } from './post.module';
import { PostService } from './post.service';
import { PostController } from './post.controller';

describe('PostController', () => {
  let em: EntityManager;
  let orm: MikroORM;
  let postController: PostController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestDbConfig, PostModule],
      providers: [PostController, PostService, PostRepository],
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
    em = orm.em.fork();
    postController = module.get<PostController>(PostController);
  });

  // 연결을 끊는다
  afterAll(async () => await orm.close(true));

  // 테스트마다 테이블을 비운다.
  beforeEach(async () => await orm.getSchemaGenerator().clearDatabase());

  it('모든 포스트를 조회해야한다.', async () => {
    // given
    const createPostDto = {
      title: 'test',
      content: 'test',
    };

    await postController.create(createPostDto);

    const posts = await postController.findAll();

    expect(posts).toHaveProperty('data');
    expect(posts).toHaveProperty('message');
    expect(posts).toHaveProperty('statusCode');
    expect(posts.data.length).toBe(1);
  });

  it('특정 포스트가 조회된다.', async () => {
    // given
    const createPostDto = {
      title: 'test',
      content: 'test',
    };

    // when
    const newPost = await postController.create(createPostDto);
    const post = await postController.findOne(`${newPost.id}`);

    // then
    expect(post).toHaveProperty('data');
    expect(post).toHaveProperty('message');
    expect(post).toHaveProperty('statusCode');
    expect(post.data.content).toBe(createPostDto.content);
    expect(post.data.title).toBe(createPostDto.title);
  });

  it('포스트를 수정한다.', async () => {
    // given
    const createPostDto = {
      title: 'test',
      content: 'test',
    };

    // when
    const newPost = await postController.create(createPostDto);
    const updatePostDto = {
      content: 'update',
      title: 'update',
    };
    const post = await postController.update(`${newPost.id}`, updatePostDto);

    // then
    expect(post).toHaveProperty('data');
    expect(post).toHaveProperty('message');
    expect(post).toHaveProperty('statusCode');
    expect(post.data.title).toEqual(updatePostDto.title);
  });

  it('포스트를 삭제한다.', async () => {
    // given
    const createPostDto = {
      title: 'test',
      content: 'test',
    };

    // when
    const newPost = await postController.create(createPostDto);
    const post = await postController.remove(`${newPost.id}`);

    // then
    expect(post).toHaveProperty('data');
    expect(post).toHaveProperty('message');
    expect(post).toHaveProperty('statusCode');
    expect(post.data.deletedAt).not.toBeNull();
  });
});
