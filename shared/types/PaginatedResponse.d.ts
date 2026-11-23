import type { Pagination } from './Pagination';

export type PaginatedResponse<T> = {
  data: T[];
  pagination: Pagination;
};
