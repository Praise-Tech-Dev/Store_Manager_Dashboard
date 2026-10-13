export type PaginationVariant = "default" | "detailed";

export interface PaginationParams {
  currentPage: number;
  totalPages: number;
  paginationVariant?: PaginationVariant;
}
