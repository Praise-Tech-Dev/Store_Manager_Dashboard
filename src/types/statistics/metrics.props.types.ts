import type {  MetricTrendPoint } from "./metric.types";
import type { MetricVisualTheme } from "./metricVisualTheme.types";

export interface MetricSparklineProps {
  trend: MetricTrendPoint[];
  theme: MetricVisualTheme;
}