import OrderIcon from "@/assets/icons/recentActivity/order-icon.svg?react";
import RegistrationIcon from "@/assets/icons/recentActivity/user-reg-icon.svg?react";
import RefundIcon from "@/assets/icons/recentActivity/refund-icon.svg?react";
import RestockIcon from "@/assets/icons/recentActivity/restock-icon.svg?react";
import type { ActivityIconProps } from "@/types/statistics/recentActivity/activityIconProps.types";

export const ActivityIcon = ({ type }: ActivityIconProps) => {
  const normalizedType = type.toLowerCase();

  switch (normalizedType) {
    case "order":
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4F46E5] text-white shadow-xs">
          <OrderIcon className="h-4.5 w-4.5" aria-hidden="true" />
        </div>
      );

    case "registration":
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ECEEF0] text-[#64748B]">
          <RegistrationIcon className="h-4.5 w-4.5" aria-hidden="true" />
        </div>
      );

    case "refund":
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFDAD6] text-[#EF4444]">
          <RefundIcon className="h-4.5 w-4.5" aria-hidden="true" />
        </div>
      );

    case "restock":
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ECEEF0] text-[#64748B]">
          <RestockIcon className="h-4.5 w-4.5" aria-hidden="true" />
        </div>
      );

    default:
      return null;
  }
};

export default ActivityIcon;
