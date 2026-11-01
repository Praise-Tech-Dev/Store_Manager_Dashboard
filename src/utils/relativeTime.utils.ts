import type { FormatRelativeTimeParams } from "@/types/shared/relativeTime.types";
import { formatOrderDate } from "./orders";
import { MS_PER_DAY, MS_PER_HOUR, MS_PER_MINUTE, RELATIVE_TIME_MAX_DAYS } from "@/constants/time.constants";

const formatAgo = (value: number, unit: string): string =>
  `${value} ${unit}${value === 1 ? "" : "s"} ago`;

export const formatRelativeTime = ({
  date,
  now,
}: FormatRelativeTimeParams): string => {
  const elapsed = Math.max(0, now.getTime() - new Date(date).getTime());

  if (elapsed < MS_PER_MINUTE) return "Just now";
  if (elapsed < MS_PER_HOUR)
    return formatAgo(Math.floor(elapsed / MS_PER_MINUTE), "min");
  if (elapsed < MS_PER_DAY)
    return formatAgo(Math.floor(elapsed / MS_PER_HOUR), "hour");
  if (elapsed < RELATIVE_TIME_MAX_DAYS * MS_PER_DAY)
    return formatAgo(Math.floor(elapsed / MS_PER_DAY), "day");
  return formatOrderDate({ date }).day;
};
