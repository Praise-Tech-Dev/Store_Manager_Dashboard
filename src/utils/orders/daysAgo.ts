import type { DaysAgoParams } from "@/types/orders";

const MS_PER_MINUTE = 60 * 1000;
const MS_PER_HOUR = 60 * MS_PER_MINUTE;
const MS_PER_DAY = 24 * MS_PER_HOUR;


export const daysAgo = ({ days, hours=0, minutes=0}: DaysAgoParams) => {
    const offset = days * MS_PER_DAY + hours * MS_PER_HOUR + minutes * MS_PER_MINUTE;
    return new Date(Date.now() - offset).toISOString();
}