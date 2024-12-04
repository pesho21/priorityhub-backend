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
        startDate: new Date(createSprintDto.start_date),
        endDate: new Date(createSprintDto.end_date),
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
        startDate: updateSprintDto.start_date
          ? new Date(updateSprintDto.start_date)
          : sprint.startDate,
        endDate: updateSprintDto.end_date
          ? new Date(updateSprintDto.end_date)
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
