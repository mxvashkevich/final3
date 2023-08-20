import {
  Model,
  Column,
  PrimaryKey,
  Table,
  AutoIncrement,
  BelongsToMany,
  ForeignKey,
  BelongsTo,
  AllowNull,
} from 'sequelize-typescript';

import { Tag } from '../../db/models/tag.model';
import { TagPost } from '../../db/models/tag-post.model';
import { User } from '../user/user.model';

@Table
export class Post extends Model<Post> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  title: string;

  @AllowNull(false)
  @Column
  content: string;

  @Column
  imageURL?: string;

  @BelongsToMany(() => Tag, () => TagPost)
  tags: Tag[];

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}
