import type { OrderDateRange, OrderFiltersBarProps, OrderStatusFilter } from "@/types/orders";
import { Select } from "../shared/Select";
import { ORDER_DATE_OPTIONS, ORDER_STATUS_OPTIONS } from "@/constants/orders";

export const OrderFiltersBar = ({ filters, onChange }: OrderFiltersBarProps) => (
  <div className="flex flex-wrap gap-3 px-6 py-4">
    <div className="w-full sm:max-w-44">
      <Select
        aria-label="Filter by status"
        options={ORDER_STATUS_OPTIONS}
        value={filters.status}
        onChange={(e) =>
          onChange({ status: e.target.value as OrderStatusFilter })
        }
        className="bg-[#F2F4F6] "
      />
    </div>
    <div className="w-full sm:max-w-48">
      <Select
        aria-label="Filter by date range"
        options={ORDER_DATE_OPTIONS}
        value={filters.dateRange}
        onChange={(e) =>
          onChange({ dateRange: e.target.value as OrderDateRange })
        }
        className="bg-[#F2F4F6]"
      />
    </div>
  </div>
);
