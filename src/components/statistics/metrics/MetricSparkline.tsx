import type { MetricSparklineProps } from "@/types/statistics";
import React, { useId } from "react";
import { ResponsiveContainer, AreaChart, Area, YAxis, Tooltip } from "recharts";

export const MetricSparkline: React.FC<MetricSparklineProps> = ({
  trend,
  theme,
}) => {
  const uniqueId = useId().replace(/:/g, "");
  const gradientId = `sparkline-gradient-${uniqueId}`;
  const safeTrend =
    trend && trend.length > 0 ? trend : [{ value: 1 }, { value: 1 }];

  return (
    <div className="h-14 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={safeTrend}
          margin={{ top: 4, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={theme.stroke}
                stopOpacity={theme.fillOpacity}
              />
              <stop offset="100%" stopColor={theme.fill} stopOpacity={0} />
            </linearGradient>
          </defs>
          <YAxis
            type="number"
            domain={[(min: number) => min * 0.7, (max: number) => max * 1.15]}
            hide
          />
          <Tooltip
            cursor={{
              stroke: theme.stroke,
              strokeWidth: 1.5,
              strokeDasharray: "2 2",
            }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const val = payload[0].value as number;
                return (
                  <div className="rounded-md bg-slate-900 px-2 py-1 text-[11px] font-semibold text-white shadow-md">
                    {val.toLocaleString()}
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="linear"
            dataKey="value"
            stroke={theme.stroke}
            strokeWidth={3}
            fill={`url(#${gradientId})`}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
