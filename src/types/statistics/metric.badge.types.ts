import type { MetricVisualTheme } from "./metricVisualTheme.types";

export interface MetricBadgeProps {
  change: string;
  isPositive: boolean;
  theme: MetricVisualTheme;
}