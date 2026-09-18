export type MetricType = "total" | "active" | "suspended";

export interface MetricSummary {
  type: MetricType;
  label: string;
  value: number;
  subtext: string;
}
