import type { MetricId } from "@/types/statistics";
import type { MetricVisualTheme } from "@/types/statistics/metricVisualTheme.types";

export const METRIC_THEMES: Record<MetricId, MetricVisualTheme> = {
  revenue: {
    stroke: "#3525CD",
    fill: "#3525CD",
    fillOpacity: 0.5,
    badgeBg: "bg-[#ECEEF0]",
    badgeText: "text-primary",
  },
  users: {
    stroke: "#505F76",
    fill: "#505F76",
    fillOpacity: 0.3,
    badgeBg: "bg-[#ECEEF0]",
    badgeText: "text-primary",
  },
  orders: {
    stroke: "#3525CD",
    fill: "#3525CD",
    fillOpacity: 0.3,
    badgeBg: "bg-[#ECEEF0]",
    badgeText: "text-primary",
  },
  conversion: {
    stroke: "#BA1A1A",
    fill: "#BA1A1A",
    fillOpacity: 0.3,
    badgeBg: "bg-[#FFDAD6]",
    badgeText: "text-[#93000A]",
  },
};

export const FALLBACK_THEME: MetricVisualTheme = {
  stroke: "#3525CD",
  fill: "#3525CD",
  fillOpacity: 0.1,
  badgeBg: "bg-gray-100",
  badgeText: "text-gray-700",
};
