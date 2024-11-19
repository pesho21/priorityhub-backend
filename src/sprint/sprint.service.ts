import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { v4 as uuidv4 } from 'uuid';
import { Sprint } from './sprint.interface'

@Injectable()
export class SprintService {
  private sprints: Sprint[] = [];

  create(createSprintDto: CreateSprintDto): Sprint {
    const newSprint: Sprint = {
      id: uuidv4(),
      name: createSprintDto.name,
      start_date: new Date(createSprintDto.start_date), 
      end_date: new Date(createSprintDto.end_date), 
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.sprints.push(newSprint);
    return newSprint;
  }
  findAll(): Sprint[] {
    return this.sprints;
  }

  findOne(id: string): Sprint {
    const sprint = this.sprints.find(sprint => sprint.id === id);
    if (!sprint) {
      throw new NotFoundException(`Sprint with ID ${id} not found`);
    }
    return sprint;
  }

  update(id: string, updateSprintDto: UpdateSprintDto): Sprint {
    const sprintIndex = this.sprints.findIndex(sprint => sprint.id === id);
    if (sprintIndex === -1) {
      throw new NotFoundException(`Sprint with ID ${id} not found`);
    }
    const updatedSprint = {
      ...this.sprints[sprintIndex],
      ...updateSprintDto,
      start_date: updateSprintDto.start_date ? new Date(updateSprintDto.start_date) : this.sprints[sprintIndex].start_date, 
      end_date: updateSprintDto.end_date ? new Date(updateSprintDto.end_date) : this.sprints[sprintIndex].end_date, 
      updatedAt: new Date(),
    };
    this.sprints[sprintIndex] = updatedSprint;
    return updatedSprint;
  }

  remove(id: string): void {
    const sprintIndex = this.sprints.findIndex(sprint => sprint.id === id);
    if (sprintIndex === -1) {
      throw new NotFoundException(`Sprint with ID ${id} not found`);
    }
    this.sprints.splice(sprintIndex, 1);
  }
}
