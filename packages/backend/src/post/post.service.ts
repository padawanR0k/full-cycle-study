import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { PostRepository } from './post.repository';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    // TODO: 제거하기
    private readonly em: EntityManager,
  ) {}

  async create(createDto: CreatePostDto) {
    const newPost = await this.postRepository.createPost(createDto);
    return newPost;
  }

  findAll() {
    return this.postRepository.findAllPost();
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOnePost(id);
    if (!post) {
      throw Error('존재하지 않는 포스트입니다.');
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOnePost(id);
    if (!post) {
      throw Error('존재하지 않는 포스트입니다.');
    }

    return this.postRepository.updatePost(post, updatePostDto);
  }

  async remove(id: number) {
    const post = await this.postRepository.findOnePost(id);

    if (!post) {
      throw Error('존재하지 않는 포스트입니다.');
    }

    return this.postRepository.removePost(post);
  }
}
