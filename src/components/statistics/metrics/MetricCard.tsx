import React from "react";
import { MetricSparkline } from "./MetricSparkline";
import type { MetricCardProps } from "@/types/statistics";
import { FALLBACK_THEME, METRIC_THEMES } from "@/constants/metric.constants";
import { MetricBadge } from "./MetricBadgeProps";

export const MetricCard: React.FC<MetricCardProps> = ({
  data,
  className = "",
}) => {
  const {
    id,
    title,
    value,
    change,
    isPositive,
    trend,
    // colorScheme = "blue",
  } = data;
  const theme = METRIC_THEMES[id] ?? FALLBACK_THEME;

  return (
    <div
      className={`*:font-inter flex flex-col justify-between overflow-hidden rounded-xl bg-white p-6 gap-4 shadow-xs transition-shadow hover:shadow-sm ${className}`}
    >
      {/* Label & Trend Badge */}
      <div className="flex items-start justify-between gap-2">
        <span className="font-inter text-xs font-normal uppercase tracking-[0.6px] leading-4 text-text-gray align-middle ">
          {title}
        </span>
        <MetricBadge change={change} isPositive={isPositive} theme={theme} />
      </div>

      {/* Main KPI Value */}
      <div className="">
        <span className="text-[32px] font-bold tracking-[-0.62px] text-gray-900 align-middle">
          {value}
        </span>
      </div>

      {/* Bottom Sparkline */}
      <div className="pt-2">
        <MetricSparkline trend={trend} theme={theme} />
      </div>
    </div>
  );
};

export default MetricCard;
