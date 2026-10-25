import { ORDER_TABS } from "@/constants/orders";
import type { OrderTabsProps } from "@/types/orders";

export const OrderTabs = ({ tab, onChange }: OrderTabsProps) => (
  <div role="tablist" className="flex gap-8 border-b border-[#ECEEF0] px-6">
    {ORDER_TABS.map((t) => {
      const isActive = t.value === tab;
      return (
        <button
          key={t.value}
          type="button"
          role="tab"
          aria-selected={isActive}
          onClick={() => onChange(t.value)}
          className={`-mb-px cursor-pointer border-b-2 py-4 text-sm font-medium transition-colors ${
            isActive
              ? "border-primary text-primary"
              : "border-transparent text-text-gray hover:text-text-default"
          }`}
        >
          {t.label}
        </button>
      );
    })}
  </div>
);
