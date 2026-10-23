export type PaginationVariant = "default" | "detailed";

export interface PaginationParams {
  currentPage: number;
  totalPages: number;
  paginationVariant?: PaginationVariant;
}

export interface PaginateParams<T> {
  items: T[];
  page: number;
  pageSize: number;
}

export interface PaginatedResult<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
}
