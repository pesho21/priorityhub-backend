import { IsString, IsOptional, IsEnum, IsDateString, IsNotEmpty, IsInt, IsArray, IsUUID } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(['low', 'medium', 'high'])
  @IsOptional()
  priority?: 'low' | 'medium' | 'high';

  @IsEnum(['daily', 'weekly', 'monthly', null])
  @IsOptional()
  recurrenceInterval?: 'daily' | 'weekly' | 'monthly' | null;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsString()
  @IsOptional()
  sprintId?: string; 

  @IsArray()
  @IsUUID("4", { each: true })
  assignees: string[];

  @IsDateString()
  @IsOptional()
  lastStartTime?: string; 

  @IsDateString()
  @IsOptional()
  lastStopTime?: string; 
  
  @IsInt()
  @IsOptional()
  timeSpentOnTask?: number;
}
