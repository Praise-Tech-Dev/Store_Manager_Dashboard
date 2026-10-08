import type { TimeRangeOption } from "@/types/statistics/exportReport";

export const TIMEFRAME_OPTIONS: readonly TimeRangeOption[] = [
  "Today",
  "Last 7 Days",
  "Last 30 Days",
  "Last 3 Months",
  "This Year",
] as const;

