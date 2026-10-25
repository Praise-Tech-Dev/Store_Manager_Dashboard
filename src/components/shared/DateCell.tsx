import type { DateTimeCellProps } from "@/types/shared/tableCellProps.types";
import { formatOrderDate } from "@/utils/orders";

export const DateTimeCell = ({ date }: DateTimeCellProps) => {
  const { day, time } = formatOrderDate({ date });
  return (
    <div>
      <p>{day}</p>
      <p className="text-xs text-text-gray">{time}</p>
    </div>
  );
};
