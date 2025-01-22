import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Sprint } from '@prisma/client'; 

@Injectable()
export class SprintService {
  constructor(private prisma: PrismaService) {}

  async create(createSprintDto: CreateSprintDto): Promise<Sprint> {
    return this.prisma.sprint.create({
      data: {
        name: createSprintDto.name,
        startDate: new Date(createSprintDto.startDate),
        endDate: new Date(createSprintDto.endDate),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  async findAll(): Promise<Sprint[]> {
    return this.prisma.sprint.findMany();
  }

  async findOne(id: string): Promise<Sprint> {
    const sprint = await this.prisma.sprint.findUnique({
      where: { id },
    });

    if (!sprint) {
      throw new NotFoundException(`Sprint with ID ${id} not found`);
    }

    return sprint;
  }

  async getTasksForSprint(sprintId: string) {
    return this.prisma.task.findMany({
      where: { sprintId },
      include: {
        users: true,
      },
    });
  }

  async getAvailableSprints() {
    const now = new Date();
    return this.prisma.sprint.findMany({
      where: { endDate: { gt: now } },
    });
  }

  async getSprintReport(sprintId: string, userId: string) {
    const tasks = await this.prisma.task.findMany({
      where: {
        sprintId,
        status: "completed",
        users: {
          some: {
            id: userId,
          },
        },
      },
    });

    const priorityCounts = tasks.reduce(
      (acc, task) => {
        acc[task.priority] = (acc[task.priority] || 0) + 1;
        return acc;
      },
      { low: 0, medium: 0, high: 0 },
    );

    return {
      totalCompleted: tasks.length,
      priorityCounts,
    };
  }

  async update(id: string, updateSprintDto: UpdateSprintDto): Promise<Sprint> {
    const sprint = await this.prisma.sprint.findUnique({
      where: { id },
    });

    if (!sprint) {
      throw new NotFoundException(`Sprint with ID ${id} not found`);
    }

    return this.prisma.sprint.update({
      where: { id },
      data: {
        name: updateSprintDto.name || sprint.name,
        startDate: updateSprintDto.startDate
          ? new Date(updateSprintDto.startDate)
          : sprint.startDate,
        endDate: updateSprintDto.endDate
          ? new Date(updateSprintDto.endDate)
          : sprint.endDate,
        updatedAt: new Date(),
      },
    });
  }

  async remove(id: string): Promise<void> {
    const sprint = await this.prisma.sprint.findUnique({
      where: { id },
    });

    if (!sprint) {
      throw new NotFoundException(`Sprint with ID ${id} not found`);
    }

    await this.prisma.sprint.delete({
      where: { id },
    });
  }
}
