export type ActivityType = "order" | "registration" | "refund" | "restock";

export interface ActivityItem {
    id: string;
    type: ActivityType;
    title: string;
    description: string;
    amount?: string;
    isNegativeAmount?: boolean;
    timestamp: string;
}

