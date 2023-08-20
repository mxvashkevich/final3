import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UserDto } from '../../dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() createUserDto: UserDto): Promise<UserDto> {
    return this.userService.createUser(createUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.userService.deleteUser(id);
  }
}
