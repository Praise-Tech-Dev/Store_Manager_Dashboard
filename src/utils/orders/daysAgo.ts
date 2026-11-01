import { MS_PER_DAY, MS_PER_HOUR, MS_PER_MINUTE } from "@/constants/time.constants";
import type { DaysAgoParams } from "@/types/orders";

export const daysAgo = ({ days, hours=0, minutes=0}: DaysAgoParams) => {
    const offset = days * MS_PER_DAY + hours * MS_PER_HOUR + minutes * MS_PER_MINUTE;
    return new Date(Date.now() - offset).toISOString();
}