import { ORDER_DATE_OPTIONS } from "@/constants/orders";
import type { OrderDateRange } from "@/types/orders/orderFilters.types";

export const getDateRangeLabel = (range: OrderDateRange): string =>
  ORDER_DATE_OPTIONS.find((option) => option.value === range)?.label ?? range;
