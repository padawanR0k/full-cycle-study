import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly blogRepository: EntityRepository<Post>,
  ) {}

  async create(title: string, content: string) {
    const post = new Post();
    post.title = title;
    post.content = content;
    const newPost = this.blogRepository.create(post);
    await this.blogRepository.getEntityManager().persistAndFlush(newPost);
    return newPost;
  }

  findAll() {
    return this.blogRepository.findAll();
  }

  findOne(id: number) {
    return this.blogRepository.findOne({ id });
  }

  // update(id: number, updatePostDto: UpdatePostDto) {
  //   const blog = this.blogRepository.findOne({ id });
  //   if (!blog) {
  //     return null;
  //   }
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} blog`;
  // }
}
