import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SignInDto } from 'src/dto/signIn.dto';
import { UserDto } from 'src/dto/user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { UserService } from '../user/user.service';
import AppErrors from '../../constants/errors';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async signUp(
    @Body()
    signUpDto: UserDto,
  ): Promise<UserDto> {
    const existUser = await this.userService.getUserByEmail(signUpDto.email);
    if (existUser) throw new BadRequestException(AppErrors.USER_EXIST);
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('signin')
  async signIn(
    @Body()
    signInDto: SignInDto,
  ): Promise<SignInDto> {
    const existUser = await this.userService.getUserByEmail(signInDto.email);
    if (!existUser) throw new BadRequestException(AppErrors.USER_EXIST);
    return this.authService.signIn(signInDto);
  }
}
