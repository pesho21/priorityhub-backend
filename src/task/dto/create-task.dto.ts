import { IsString, IsOptional, IsEnum, IsDateString, IsNotEmpty } from 'class-validator';

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
  recurrence_interval?: 'daily' | 'weekly' | 'monthly' | null;

  @IsDateString()
  @IsOptional()
  due_date?: string;

  @IsString()
  @IsOptional()
  sprint_id?: string;
}
