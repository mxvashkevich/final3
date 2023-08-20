import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Post } from './post.model';
import { User } from '../user/user.model';
import { Tag } from '../../db/models/tag.model';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post)
    private readonly postRepository: typeof Post,
  ) {}

  getAllPosts(): Promise<Post[]> {
    return this.postRepository.findAll({
      include: [
        {
          model: Tag,
          attributes: ['id', 'name'],
          through: {
            attributes: [],
          },
        },
        {
          model: User,
          attributes: ['id', 'name', 'email'],
        },
      ],
      order: [['createdAt', 'ASC']],
    });
  }
}
