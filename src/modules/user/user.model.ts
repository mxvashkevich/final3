import {
  Model,
  Column,
  PrimaryKey,
  Table,
  Unique,
  HasMany,
  AutoIncrement,
  BeforeCreate,
  AllowNull,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

import { Post } from '../post/post.model';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  name: string;

  @Column
  avatar?: string;

  @AllowNull(false)
  @Unique
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  @BeforeCreate
  static async hashPasswordEmailChange(instance: User) {
    const hashedPassword = await bcrypt.hash(
      instance.password,
      Number(process.env.SALT_ROUNDS),
    );
    const emailLowerCase = instance.email.trim().toLowerCase();
    instance.password = hashedPassword;
    instance.email = emailLowerCase;
  }

  @HasMany(() => Post, { onDelete: 'CASCADE' })
  posts: Post[];

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}
