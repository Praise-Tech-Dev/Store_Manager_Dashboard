// components/products/StockHealth.tsx
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import type { ProductStatus } from "@/types/products";
import { calculateStatus } from "@/utils/products/productEnricher";

const MAX_CAPACITY = 200; 

const STATUS_STYLES = {
  "In Stock": {
    Icon: CheckCircle2,
    label: "In Stock (Healthy)",
    color: "text-[#137333]",
    bg: "bg-[#E6F4EA]",
    bar: "bg-green-700",
  },
  "Low Stock": {
    Icon: AlertTriangle,
    label: "Low Stock",
    color: "text-amber-700",
    bg: "bg-amber-100",
    bar: "bg-amber-600",
  },
  "Out of Stock": {
    Icon: XCircle,
    label: "Out of Stock",
    color: "text-red-700",
    bg: "bg-red-100",
    bar: "bg-red-600",
  },
} as const satisfies Record<ProductStatus, unknown>;

export const StockHealth = ({ stockCount }: { stockCount: number }) => {
  const { Icon, label, color, bg, bar } =
    STATUS_STYLES[calculateStatus(stockCount)];
  const percent = Math.min(100, Math.round((stockCount / MAX_CAPACITY) * 100));

  return (
    <div className="flex items-center gap-4 rounded-xl bg-[#F2F4F6] p-4">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${bg}`}
      >
        <Icon className={`h-5 w-5 ${color}`} />
      </div>
      <div className="shrink-0">
        <p className="text-xs text-text-gray">Current Health</p>
        <p className="text-sm font-medium text-text-default">{label}</p>
      </div>
      <div className="flex-1">
        <div className="mb-1 flex justify-between text-xs text-text-gray">
          <span>Capacity</span>
          <span>{percent}%</span>
        </div>
        <div
          role="progressbar"
          aria-label="Stock capacity"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-2 w-full rounded-full bg-slate-200"
        >
          <div
            className={`h-2 rounded-full ${bar}`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
