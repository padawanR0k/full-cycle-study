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

  create() {
    const blog = new Post();
    blog.title = 'My First Post';
    blog.content = 'Hello World!';
    return this.blogRepository.create(blog);
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
