import type { Column } from "./Column.types";
import type { PaginationConfig } from "./PaginationConfig.types";

// Base constraint ensuring every row has at least an id or string/number key
export interface Identifiable {
  id?: string | number;
}
export type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  getRowKey?: (row: T) => string | number;
  pagination?: PaginationConfig;
  onClearFilters?: () => void;
};
