import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SprintService } from './sprint.service';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { Sprint } from './sprint.interface'

@Controller('sprint')
export class SprintController {
  constructor(private readonly sprintService: SprintService) {}

  @Post()
  create(@Body() createSprintDto: CreateSprintDto): Sprint {
    return this.sprintService.create(createSprintDto);
  }

  @Get()
  findAll(): Sprint[] {
    return this.sprintService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Sprint {
    return this.sprintService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSprintDto: UpdateSprintDto): Sprint {
    return this.sprintService.update(id, updateSprintDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sprintService.remove(id);
  }
}
