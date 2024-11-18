import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationUserDto } from './dto/pagination-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findUsers(@Query() paginationUserDto: PaginationUserDto) {
    const { page, limit } = paginationUserDto;
    return this.userService.findUsers(page, limit);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':user_uuid')
  findUser(@Param('user_uuid') user_uuid: string) {
    return this.userService.findUser(user_uuid);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':user_uuid')
  updateUser(
    @Param('user_uuid') user_uuid: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(user_uuid, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':user_uuid')
  @HttpCode(204)
  deleteUser(@Param('user_uuid') user_uuid: string) {
    return this.userService.deleteUser(user_uuid);
  }
}
