import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { SprintService } from './sprint.service';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { Sprint } from '@prisma/client';
import { JwtGuard } from 'src/auth/jwt.guard';

@UseGuards(JwtGuard)
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

  @Get(':id/tasks')
  async getTasksForSprint(@Param('id') sprintId: string) {
    return this.sprintService.getTasksForSprint(sprintId);
  }

  @Get('list/available')
  async getAvailableSprints() {
    return this.sprintService.getAvailableSprints();
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
