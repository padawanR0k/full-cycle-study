import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';
import { ResponseEntity } from '../../libs/common-config/src/ResponseEntity';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  async findAll() {
    const posts = await this.postService.findAll();
    return ResponseEntity.OK_WITH(posts);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const post = this.postService.findOne(+id);
    return ResponseEntity.OK_WITH(post);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    try {
      await this.postService.update(+id, updatePostDto);
      return ResponseEntity.OK();
    } catch (e) {
      throw new Error('post update 실패');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.postService.remove(+id);
      return ResponseEntity.OK();
    } catch (e) {
      throw new Error('post delete 실패');
    }
  }
}
