import { IsString } from 'class-validator';

export class PaginationUserDto {
  @IsString()
  page: number;
  @IsString()
  limit: number;
}
