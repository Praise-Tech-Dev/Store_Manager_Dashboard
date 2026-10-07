import type { CategoryTooltipProps } from "@/types/statistics/topCategories/categoryTooltipPayloadItem.types";

export const TopCategoriesTooltip = ({ active, payload }: CategoryTooltipProps) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const data = payload[0].payload;

  return (
    <div className="rounded-xl bg-white px-3 py-2 shadow-lg backdrop-blur-xs text-xs">
      <div className="flex items-center gap-2 mb-1">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: data.color }}
        />
        <p className="font-semibold text-slate-900">{data.name}</p>
      </div>
      <p className="text-slate-500">
        Items:{" "}
        <span className="font-medium text-slate-800">
          {Number(data.value).toLocaleString()}
        </span>
      </p>
      <p className="text-slate-500">
        Share:{" "}
        <span className="font-medium text-slate-800">{data.percentage}%</span>
      </p>
    </div>
  );
};

export default TopCategoriesTooltip;
