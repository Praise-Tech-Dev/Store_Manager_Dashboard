import type { MetricTrendPoint } from "@/types/statistics";

/**
 * Transforms an aggregate total into an 8-point zigzag progression
 */
export const generateZigzagTrend = (
  baseValue: number,
  direction: "upward" | "neutral" | "downward",
): MetricTrendPoint[] => {
  const multipliers: Record<"upward" | "neutral" | "downward", number[]> = {
    upward: [0.32, 0.48, 0.4, 0.62, 0.54, 0.82, 0.74, 0.98],
    neutral: [0.55, 0.42, 0.65, 0.48, 0.62, 0.45, 0.7, 0.5],
    downward: [0.95, 0.84, 0.72, 0.82, 0.64, 0.7, 0.5, 0.58],
  };

  const scale = baseValue > 0 ? baseValue : 100;

  return multipliers[direction].map((ratio) => ({
    value: Math.round(scale * ratio * 100) / 100,
  }));
};
