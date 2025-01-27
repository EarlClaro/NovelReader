import { IsString, IsOptional } from 'class-validator';

export class FilterBookDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsString()
  @IsOptional()
  genre?: string;
}
