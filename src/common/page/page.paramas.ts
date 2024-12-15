export const PAGE = 1;
export const PAGE_SIZE = 10;

export const PARAMS: PageParams = {
  page: PAGE,
  size: PAGE_SIZE,
};

export interface PageParams {
  page: number;
  size: number;
  sorts?: string;
}
