import type {
  OrderDateRange,
  OrderFilters,
  OrderStatusFilter,
  OrderTab,
} from "@/types/orders/orderFilters.types";
import type { SelectOption } from "@/types/shared/select/selectOptions.types";

export const ORDER_TABS: SelectOption<OrderTab>[] = [
  { label: "All Orders", value: "all" },
  { label: "Pending Carts", value: "pending" },
  { label: "Returns", value: "returns" },
];

export const ORDER_STATUS_OPTIONS: SelectOption<OrderStatusFilter>[] = [
  { value: "all", label: "All" },
  { value: "PAID", label: "Paid" },
  { value: "FAILED", label: "Failed" },
  { value: "PENDING", label: "Pending" },
];

export const ORDER_DATE_OPTIONS: SelectOption<OrderDateRange>[] = [
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "90d", label: "Last 90 Days" },
  { value: "all", label: "All Time" },
];

export const ORDER_DATE_RANGE_DAYS: Record<OrderDateRange, number | null> = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
  all: null,
};

export const DEFAULT_ORDER_FILTERS: OrderFilters = {
  status: "all",
  dateRange: "all",
};
export const ORDERS_PAGE_SIZE = 4;
