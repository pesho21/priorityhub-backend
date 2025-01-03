import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Request } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '@prisma/client';
import { JwtGuard } from '../auth/jwt.guard';
import { UseGuards } from '@nestjs/common';

@UseGuards(JwtGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Request() req): Promise<Task> {
    console.log(req);
    const userId = req.user.id; 
    return this.taskService.create(createTaskDto, userId);
  }

  @Get()
  findAll(@Request() req): Promise<Task[]> {
    const userId = req.user.id;
    return this.taskService.findAll(userId);
  }


  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Task> {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.taskService.remove(id);
  }
}
