import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SprintService } from './sprint.service';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { Sprint } from '@prisma/client';

@Controller('sprint')
export class SprintController {
  constructor(private readonly sprintService: SprintService) {}

  @Post()
  async create(@Body() createSprintDto: CreateSprintDto): Promise<Sprint> {
    return this.sprintService.create(createSprintDto);
  }

  @Get()
  async findAll(): Promise<Sprint[]> {
    return this.sprintService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Sprint> {
    return this.sprintService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSprintDto: UpdateSprintDto,
  ): Promise<Sprint> {
    return this.sprintService.update(id, updateSprintDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.sprintService.remove(id);
  }
}
