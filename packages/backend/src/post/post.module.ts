import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Post } from './entities/post.entity';
import { PostRepository } from './post.repository';

@Module({
  imports: [MikroOrmModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostModule {}
