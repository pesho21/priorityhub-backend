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
        assignees: {
          connect: { id: userId },
        },
      },
    });
  
    return task; 
  }
  
  
  async findAll(userId: string): Promise<Task[]> {
    const tasks = this.prisma.task.findMany({
      where: {
        assignees: {
          some: { id: userId }, 
        },
      },
      include: {
        assignees: true,
      },
    });
    console.log((await tasks).map((task) => ({
      ...task,
    })));
    return tasks;
  }
  

  async findOne(id: string): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        assignees: true,
      },
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
  
    const { assignees, ...otherUpdates } = updateTaskDto as any;
    if(otherUpdates.sprintId == '') otherUpdates.sprintId = null;
    console.log(otherUpdates);
  
    const updatedTask = await this.prisma.task.update({
      where: { id },
      data: {
        ...otherUpdates,
        updatedAt: new Date(),
        assignees: assignees
          ? {
              set: assignees.map((userId) => ({ id: userId })), 
            }
          : undefined, 
      },
    });
  
    return updatedTask;
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
