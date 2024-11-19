import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsEnum, IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsEnum(['not_started', 'in_progress', 'completed'])
  @IsOptional()
  status?: 'not_started' | 'in_progress' | 'completed';

  @IsDateString()
  @IsOptional()
  last_start_time?: string;

  @IsDateString()
  @IsOptional()
  last_stop_time?: string;

  @IsOptional()
  time_spent_on_task?: number;
}
