import { EntityRepository } from '@mikro-orm/postgresql';
import { Post } from './entities/post.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@mikro-orm/nestjs';

export class PostRepository {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: EntityRepository<Post>,
  ) {}

  findAllPost() {
    // 엔티티와 where 조건문을 지정한다.
    return this.postRepository.find({ deletedAt: null });
  }

  findOnePost(id: number) {
    return this.postRepository.findOne({ id });
  }

  async removePost(post: Post) {
    post.deletedAt = new Date();
    await this.postRepository.persistAndFlush(post);
    return post;
  }

  async updatePost(post: Post, updatePostDto: UpdatePostDto) {
    post.content = updatePostDto.content;
    post.title = updatePostDto.title;
    await this.postRepository.persistAndFlush(post);
    return post;
  }

  async createPost(createDto: CreatePostDto) {
    const post = new Post();
    post.title = createDto.title;
    post.content = createDto.content;
    return post;
  }
}
