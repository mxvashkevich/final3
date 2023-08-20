import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './user.model';
import { UserDto } from 'src/dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async getAllTest() {
    return await this.userModel.findAll();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userModel.findOne({
      where: { id },
      attributes: {
        exclude: ['password'],
      },
    });
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({
      where: { email },
      attributes: {
        exclude: ['password'],
      },
    });
    return user;
  }

  async createUser(userDto: UserDto): Promise<User> {
    const createdUser = await this.userModel.create(userDto);
    delete createdUser.dataValues.password;
    return createdUser;
  }

  async deleteUser(id: number): Promise<number> {
    return await this.userModel.destroy({ where: { id } });
  }
}
