export type ActivityType = "order" | "registration" | "refund" | "restock";

export interface ActivityItem {
    id: string;
    type: ActivityType;
    description: string;
    amount?: string;
    isNegativeAmount?: boolean;
    timestamp: string;
}