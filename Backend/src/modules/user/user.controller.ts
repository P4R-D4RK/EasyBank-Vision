import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Put,
  Param,
  Get,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createUser: CreateUserDto) {
    return this.userService.create(createUser);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateUser: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUser);
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    if (users.length == 0) {
      throw new NotFoundException(`Users not found`);
    }
    return users;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return {
      data: user,
    };
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return this.userService.deleteOne(id);
  }
}
