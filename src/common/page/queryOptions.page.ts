import { SelectQueryBuilder } from 'typeorm';

export function addLikeFilters<T>(
  queryBuilder: SelectQueryBuilder<T>,
  filters: Record<string, string>,
  keyQuery: string[],
  table: string,
) {
  for (const key of keyQuery) {
    const filterValue = `%${filters[key]}%`;
    console.log(filterValue);
    console.log('filters-filters', filters);
    const sanitizedKey = key.replace(/[^A-Za-z0-9_.]/g, '_');
    queryBuilder.andWhere(`${table}.${key} LIKE :${sanitizedKey}`, {
      [sanitizedKey]: filterValue,
    });
  }
}

export function addSortOptions<T>(
  queryBuilder: SelectQueryBuilder<T>,
  table: string,
  sortOptions: string,
) {
  const keyQuery = JSON.parse(sortOptions) ?? [];
  for (const key of keyQuery) {
    const sortDirection = Object.keys(key).toString();
    const valueDirection = Object.values(key).toString();
    queryBuilder.addOrderBy(
      `${table}.${sortDirection}`,
      valueDirection as 'ASC' | 'DESC',
    );
  }
}
