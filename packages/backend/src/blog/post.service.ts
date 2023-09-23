import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { EntityManager } from '@mikro-orm/postgresql';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: EntityRepository<Post>,
    private readonly em: EntityManager,
  ) {}

  async create(title: string, content: string) {
    const post = new Post();
    post.title = title;
    post.content = content;
    const newPost = this.postRepository.create(post);
    await this.em.persistAndFlush(newPost);
    return newPost;
  }

  findAll() {
    // 엔티티와 where 조건문을 지정한다.
    return this.em.find(Post, { deletedAt: null });
  }

  findOne(id: number) {
    return this.em.findOne(Post, { id });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.findOne(id);
    if (!post) {
      return null;
    }
    post.content = updatePostDto.content;
    post.title = updatePostDto.title;
    await this.em.persistAndFlush(post);
    return post;
  }

  async remove(id: number) {
    const post = await this.findOne(id);

    if (!post) {
      return null;
    }

    post.deletedAt = new Date();

    await this.em.persistAndFlush(post);

    return post;
  }
}
