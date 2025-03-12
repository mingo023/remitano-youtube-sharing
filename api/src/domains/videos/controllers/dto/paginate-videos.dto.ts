import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

export class PaginateVideosDto {
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  limit: number;

  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  page: number;
}
