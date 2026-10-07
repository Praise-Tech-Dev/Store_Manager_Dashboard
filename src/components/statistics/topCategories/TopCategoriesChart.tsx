import type { TopCategoriesChartProps } from "@/types/statistics/topCategories/topCategoriesChartProps.types";
import { PieChart, Pie, ResponsiveContainer, Tooltip } from "recharts";
import TopCategoriesTooltip from "./TopCategoriesTooltip";
import { useState } from "react";



export const TopCategoriesChart = ({
  data,
}: TopCategoriesChartProps) => {
  const { totalItems, categories } = data;
    const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="flex h-full flex-col justify-between rounded-xl bg-white p-4 sm:p-6 shadow-xs ">
      <h2 className="font-inter text-xl font-semibold text-text-default tracking-normal leading-7">
        Top Categories
      </h2>

      {/* Donut Chart with Center Text */}
      <div className="relative my-2 flex h-52 items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<TopCategoriesTooltip />} />
            <Pie
              data={categories.map((cat) => ({ ...cat, fill: cat.color }))}
              dataKey="percentage"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              startAngle={90}
              endAngle={-270}
              stroke="transparent"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Centered Counter */}
        <div
          className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-200 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        >
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            {totalItems.toLocaleString()}
          </span>
          <span className="text-[11px] font-medium text-slate-400">
            Total Items
          </span>
        </div>
      </div>

      {/* Custom Category Legend List */}
      <div className="flex flex-col gap-2.5 pt-2">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-2.5">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              <span className="text-xs font-normal text-text-gray leading-4 tracking-normal">
                {cat.name}
              </span>
            </div>
            <span className="text-xs font-normal text-text-gray leading-4 tracking-normal font-inter">
              {cat.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
