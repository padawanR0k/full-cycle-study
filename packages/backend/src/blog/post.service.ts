import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: EntityRepository<Post>,
  ) {}

  async create(title: string, content: string) {
    const post = new Post();
    post.title = title;
    post.content = content;
    const newPost = this.postRepository.create(post);
    await this.postRepository.getEntityManager().persistAndFlush(newPost);
    return newPost;
  }

  findAll() {
    return this.postRepository.findAll();
  }

  findOne(id: number) {
    return this.postRepository.findOne({ id });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOne({ id });
    if (!post) {
      return null;
    }
    post.content = updatePostDto.content;
    post.title = updatePostDto.title;
    await this.postRepository.getEntityManager().persistAndFlush(post);
    return post;
  }

  async remove(id: number) {
    const post = await this.postRepository.findOne({ id });

    if (!post) {
      return null;
    }

    post.deletedAt = new Date();

    await this.postRepository.getEntityManager().persistAndFlush(post);

    return post;
  }
}
