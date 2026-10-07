import type { MetricBadgeProps } from "@/types/statistics/metric.badge.types";

export const MetricBadge = ({ change, isPositive, theme }: MetricBadgeProps) => {
  return (
    <span
      className={`inline-flex shrink-0 whitespace-nowrap items-center gap-0.5 sm:gap-1 rounded-full px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-semibold ${
        isPositive
          ? `${theme.badgeBg} ${theme.badgeText}`
          : "bg-[#FFDAD6] text-[#93000A]"
      }`}
    >
      <svg
        className={`h-2 w-3 ${isPositive ? "" : "rotate-180"}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
      <span
        className={`${isPositive ? "text-text-default" : "text-[#93000A]"} font-inter text-[11px] leading-[16.5px] tracking-normal font-semibold align-middle`}
      >
        {isPositive ? "+" : "-"}
        {change.replace(/^[+-]/, "")}
      </span>
    </span>
  );
};
