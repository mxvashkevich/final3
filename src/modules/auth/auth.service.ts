import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SignInDto } from 'src/dto/signIn.dto';
import { UserDto } from 'src/dto/user.dto';
import { UserService } from '../user/user.service';

import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/user/user.model';
import AppErrors from 'src/constants/errors';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: UserDto) {
    try {
      const user = await this.userService.createUser(signUpDto);
      const { accessToken } = await this.createJwtToken(user);
      return { ...user.dataValues, accessToken };
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async signIn(signInDto: SignInDto) {
    try {
      console.log(signInDto);
      const user = await this.userService.getUserByEmail(signInDto.email);
      const isCorrectPassword = await bcrypt.compare(
        signInDto.password,
        user.password,
      );
      if (!isCorrectPassword) {
        throw new BadRequestException(AppErrors.DATA_WROND);
      }
      return user;
    } catch (error) {
      throw new HttpException(
        'the entered data did not pass verification',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async createJwtToken(user: User) {
    const payload = {
      sub: user.id,
      userName: user.name,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
