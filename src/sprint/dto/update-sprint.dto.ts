import { PartialType } from '@nestjs/mapped-types';
import { CreateSprintDto } from './create-sprint.dto';
import { IsOptional, IsDateString, IsString } from 'class-validator';

export class UpdateSprintDto extends PartialType(CreateSprintDto) {
  @IsString()
  @IsOptional()
  name?: string;

  @IsDateString()
  @IsOptional()
  start_date?: string;

  @IsDateString()
  @IsOptional()
  end_date?: string;
}
