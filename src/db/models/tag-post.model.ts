import {
  AllowNull,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { Post } from '../../modules/post/post.model';
import { Tag } from './tag.model';

@Table
export class TagPost extends Model<TagPost> {
  @ForeignKey(() => Post)
  @AllowNull(false)
  @Column
  postId: number;

  @ForeignKey(() => Tag)
  @AllowNull(false)
  @Column
  tagId: number;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}
