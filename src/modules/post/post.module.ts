import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { TagPost } from '../../db/models/tag-post.model';
import { Tag } from '../../db/models/tag.model';
import { Post } from './post.model';

import { PostService } from './post.service';
import { PostController } from './post.controller';

@Module({
  imports: [SequelizeModule.forFeature([Post, Tag, TagPost])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
