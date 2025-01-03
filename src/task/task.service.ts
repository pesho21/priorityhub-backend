import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    const task = await this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description || null,
        status: 'not_started', 
        priority: createTaskDto.priority || 'low',  
        recurrenceInterval: createTaskDto.recurrenceInterval || null,
        dueDate: createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : null,
        sprintId: createTaskDto.sprintId || null,
        lastStartTime: createTaskDto.lastStartTime ? new Date(createTaskDto.lastStartTime) : null,
        lastStopTime: createTaskDto.lastStopTime ? new Date(createTaskDto.lastStopTime) : null,
        timeSpentOnTask: createTaskDto.timeSpentOnTask || 0,
        users: {
          connect: { id: userId },
        },
      },
    });
  
    return task; 
  }
  
  
  async findAll(userId: string): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        users: {
          some: { id: userId }, 
        },
      },
    });
  }
  

  async findOne(id: string): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return this.prisma.task.update({
      where: { id },
      data: {
        ...updateTaskDto,
        updatedAt: new Date(),
      },
    });
  }

  async remove(id: string): Promise<void> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    await this.prisma.task.delete({
      where: { id },
    });
  }
}
