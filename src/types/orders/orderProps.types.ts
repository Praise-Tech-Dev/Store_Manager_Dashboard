import type { PaginationConfig } from "../table/PaginationConfig.types";
import type { Order } from "./order.types";
import type { OrderFilters, OrderTab } from "./orderFilters.types";

export interface OrderTableProps {
  orders: Order[];
  pagination: PaginationConfig;
  onClearFilters: () => void;
}

export interface OrderFiltersBarProps {
  filters: OrderFilters;
  onChange: (changes: Partial<OrderFilters>) => void;
}

export interface OrderTabsProps {
  tab: OrderTab; 
  onChange: (tab: OrderTab) => void;
}

