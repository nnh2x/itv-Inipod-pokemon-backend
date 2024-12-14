import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class FilterSearchDto {
  [key: string]: string | number | boolean;
}

export class QueryPaginationDto {
  @ApiProperty()
  @IsOptional()
  page?: string;

  @ApiProperty()
  @IsOptional()
  size?: string;

  sorts?: string;

  filters?: string;
}

export function parseFilter(filterString: string): Record<string, string> {
  if (!filterString) return {};

  return filterString.split(';').reduce(
    (acc, pair) => {
      const [key, value] = pair.split(':');
      if (key && value) acc[key.trim()] = value.trim();
      return acc;
    },
    {} as Record<string, string>,
  );
}
