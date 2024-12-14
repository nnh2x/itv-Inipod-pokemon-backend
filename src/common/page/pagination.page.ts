import { NotFoundException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { QueryPaginationDto } from './query-pagination.page';

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;
class PageInfo {
  @ApiProperty({ description: 'Total number of items' })
  total: number;

  @ApiProperty({ description: 'Total number of pages' })
  lastPage: number;

  @ApiProperty({ description: 'Current page number' })
  currentPage: number;

  @ApiProperty({ description: 'Number of items per page' })
  totalPerPage: number;

  @ApiProperty({
    description: 'Previous page number, null if no previous page',
    type: Number,
    nullable: true,
  })
  prevPage: number | null;

  @ApiProperty({
    description: 'Next page number, null if no next page',
    type: Number,
    nullable: true,
  })
  nextPage: number | null;
}

export class PaginateOutput<T> {
  @ApiProperty({ type: [Object], description: 'Array of data items' })
  data: T[];

  @ApiProperty({ description: 'Pagination information' })
  page: PageInfo;
}
export const paginate = (
  query: QueryPaginationDto,
): { skip: number; take: number } => {
  const size = Math.max(Math.abs(parseInt(query.size)) || DEFAULT_PAGE_SIZE, 1);
  const page = Math.max(
    Math.abs(parseInt(query.page)) || DEFAULT_PAGE_NUMBER,
    1,
  );
  return {
    skip: size * (page - 1),
    take: size,
  };
};

export const paginateOutput = <T>(
  data: T[],
  total: number,
  query: QueryPaginationDto,
): PaginateOutput<T> => {
  const page = Math.max(
    Math.abs(parseInt(query.page)) || DEFAULT_PAGE_NUMBER,
    1,
  );
  const size = Math.max(Math.abs(parseInt(query.size)) || DEFAULT_PAGE_SIZE, 1);
  const lastPage = Math.ceil(total / size);

  // If data is empty, return empty array
  if (!data.length) {
    return {
      data,
      page: {
        total,
        lastPage,
        currentPage: page,
        totalPerPage: size,
        prevPage: null,
        nextPage: null,
      },
    };
  }

  // If page is greater than last page, throw an error
  if (page > lastPage) {
    throw new NotFoundException(
      `Page ${page} not found. Last page is ${lastPage}`,
    );
  }

  return {
    data,
    page: {
      total,
      lastPage,
      currentPage: page,
      totalPerPage: size,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < lastPage ? page + 1 : null,
    },
  };
};
