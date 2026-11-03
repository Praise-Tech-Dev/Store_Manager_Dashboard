import { X } from "lucide-react";
import type { OrderSearchChipProps } from "@/types/orders";

export const OrderSearchChip = ({ term, onClear }: OrderSearchChipProps) => (
  <div className="px-6 pb-4">
    <span className="inline-flex max-w-full items-center gap-2 rounded-full bg-[#E6E8EA] py-1.5 pl-4 pr-2 text-xs font-medium text-text-gray">
      <span className="truncate">Showing results for “{term}”</span>
      <button
        type="button"
        onClick={onClear}
        aria-label="Clear search"
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full hover:bg-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </span>
  </div>
);