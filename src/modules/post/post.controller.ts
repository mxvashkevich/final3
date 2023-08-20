import { Controller, Get } from '@nestjs/common';

import { Post } from './post.model';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAll(): Promise<Post[]> {
    return this.postService.getAllPosts();
  }
}
