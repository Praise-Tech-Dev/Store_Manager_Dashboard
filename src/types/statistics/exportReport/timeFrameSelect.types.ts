import type { OrderDateRange } from "@/types/orders";

export interface TimeframeSelectProps {
  value: OrderDateRange;
  onChange: (next: OrderDateRange) => void;
}
