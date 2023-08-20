import {
  Model,
  Column,
  PrimaryKey,
  Table,
  Unique,
  BelongsToMany,
  AllowNull,
} from 'sequelize-typescript';

import { Post } from '../../modules/post/post.model';
import { TagPost } from './tag-post.model';

@Table
export class Tag extends Model<Tag> {
  @PrimaryKey
  @Column
  id: number;

  @Unique
  @AllowNull(false)
  @Column
  name: string;

  @BelongsToMany(() => Post, () => TagPost)
  posts: Post[];

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}
