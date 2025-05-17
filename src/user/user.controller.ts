import {Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpCode, HttpStatus, UseGuards, ForbiddenException} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/jwt.guard';
import { GetUser } from './get-user';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto){
      const newUser = await this.userService.create(createUserDto);
      return { newUser };
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return { users };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.userService.findOne(id);
      return { user };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  @Get(':username/email')
  async findEmail(@Param('username') username: string) {
    try {
      console.log(username);
      const email = await this.userService.findEmail(username);
      console.log(email);
      return { email };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException(`User with username ${username} not found`);
    }
  }
  
  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @GetUser() user: any) {
    if (user.id !== id) {
      throw new ForbiddenException('You can only update your own account');
    }

    try {
      const updatedUser = await this.userService.update(id, updateUserDto);
      return { updatedUser };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @GetUser() user: any): Promise<void> {
    if (user.id !== id) {
      throw new ForbiddenException('You can only update your own account');
    }

    try {
      await this.userService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
