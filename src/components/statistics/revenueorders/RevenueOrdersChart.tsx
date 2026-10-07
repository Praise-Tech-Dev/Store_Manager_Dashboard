import type { RevenueOrdersChartProps } from "@/types/statistics";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
export const RevenueOrdersChart= ({
  data,
}: RevenueOrdersChartProps) => {
  return (
    <div className="flex h-full flex-col gap-6 rounded-xl bg-white p-4 sm:p-6 shadow-xs ">
      {/* Title & Legend Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
        <h2 className="font-inter text-xl font-semibold text-text-default tracking-normal leading-7">
          Revenue vs Orders
        </h2>
        <div className="flex items-center gap-2 sm:gap-4 text-xs font-normal text-text-gray leading-4 tracking-normal ">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-primary " />
            <span className="align-middle">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#505F76]" />
            <span className="align-middle">Orders</span>
          </div>
        </div>
      </div>

      {/* Main Dual-Axis Line Graph */}
      <div className="h-97.25 min-h-75 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 14, left: 14, bottom: 10 }}
          >
            {/* background grid lines  */}
            <CartesianGrid
              yAxisId="revenue"
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E2E8F0"
              horizontalCoordinatesGenerator={({ height }) => [
                Math.round(height * 0.22),
                Math.round(height * 0.52),
                Math.round(height * 0.82),
              ]}
            />
            {/* bottom horizontal axis  */}
            <XAxis
              dataKey="day"
              axisLine={{ stroke: "#E2E8F0", strokeWidth: 1 }}
              tickLine={false}
              tick={{ fill: "#464555", fontSize: 12, fontWeight: 400 }}
              dy={12}
              interval={0}
            />
            {/* left value scale  */}
            <YAxis
              yAxisId="revenue"
              hide={true}
              domain={[
                (dataMin: number) => Math.max(0, Math.floor(dataMin * 0.8)),
                (dataMax: number) => Math.ceil((dataMax || 100) * 1.15),
              ]}
            />
            {/* right value scale */}
            <YAxis
              yAxisId="orders"
              orientation="right"
              hide={true}
              domain={[
                (dataMin: number) => Math.max(0, Math.floor(dataMin * 0.8)),
                (dataMax: number) => Math.ceil((dataMax || 10) * 1.15),
              ]}
            />
            {/* hover interactions  */}
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-xl border border-slate-100 bg-white/95 p-3 shadow-lg backdrop-blur-xs text-xs">
                      <p className="font-semibold text-slate-900 mb-1.5">
                        {label}
                      </p>
                      <p className="text-[#4338CA] font-medium">
                        Revenue: ${payload[0]?.value?.toLocaleString()}
                      </p>
                      <p className="text-[#334155] font-medium">
                        Orders: {payload[1]?.value?.toLocaleString()}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            {/* Revenue Curve purple Line */}
            <Line
              yAxisId="revenue"
              type="monotone"
              dataKey="revenue"
              stroke="#3525CD"
              strokeWidth={3.69}
              dot={false}
              activeDot={{ r: 5, fill: "#3525CD" }}
              // isAnimationActive={false}
            />
            {/* Orders Curve dashed line*/}
            <Line
              yAxisId="orders"
              type="monotone"
              dataKey="orders"
              stroke="#505F76"
              strokeWidth={2.77}
              strokeDasharray="4 3"
              dot={false}
              activeDot={{ r: 4, fill: "#505F76" }}
              // isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
