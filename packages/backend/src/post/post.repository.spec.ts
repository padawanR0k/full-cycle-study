import { Test, TestingModule } from '@nestjs/testing';
import { PostRepository } from './post.repository';
import { EntityManager, MikroORM } from '@mikro-orm/core';
import { TestDbConfig } from '../../test/test-db.config';
import { PostModule } from './post.module'; // PostRepository 클래스의 경로를 수정해야 할 수도 있음
import { Post } from './entities/post.entity';

describe('PostRepository', () => {
  let em: EntityManager;
  let orm: MikroORM;
  let postRepository: PostRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestDbConfig, PostModule],
      providers: [PostRepository],
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
    postRepository = module.get<PostRepository>(PostRepository);
  });

  // 연결을 끊는다
  afterAll(async () => await orm.close(true));

  // 테스트마다 테이블을 비운다.
  beforeEach(async () => await orm.getSchemaGenerator().clearDatabase());

  /**
   * 이거 서비스 레이어랑 동어반복인데???
   */
  it('모든 포스트를 조회해야한다.', async () => {
    // 이 테스트는 findAllPost 메소드를 테스트합니다.
    // given
    const createPostDto = {
      title: 'test',
      content: 'test',
    };

    const newPost = em.create(Post, createPostDto);
    await em.persistAndFlush(newPost);

    const posts = await postRepository.findAllPost();
    expect(posts.length).toBe(1);
  });

  it('포스트를 생성해야한다.', async () => {
    // given
    const createPostDto = {
      title: 'test',
      content: 'test',
    };

    // when
    const newPost = await postRepository.createPost(createPostDto);

    // then
    expect(newPost.title).toBe(createPostDto.title);
    expect(newPost.content).toBe(createPostDto.content);
  });

  it('포스트를 삭제해야한다.', async () => {
    // given
    const createPostDto = {
      title: 'test',
      content: 'test',
    };
    const post = await postRepository.createPost(createPostDto);

    // when
    const deletedPost = await postRepository.removePost(post);

    // then
    expect(deletedPost.deletedAt).not.toBeNull();
  });

  it('포스트를 수정해야한다.', async () => {
    // given
    const createPostDto = {
      title: 'test',
      content: 'test',
    };
    const post = await postRepository.createPost(createPostDto);

    // when
    const updatePostDto = {
      title: 'update',
      content: 'update',
    };
    const updatedPost = await postRepository.updatePost(post, updatePostDto);

    // then
    expect(updatedPost.title).toBe(updatePostDto.title);
    expect(updatedPost.content).toBe(updatePostDto.content);
  });
});
