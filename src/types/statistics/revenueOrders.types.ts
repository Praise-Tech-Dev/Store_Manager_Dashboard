export interface RevenueOrdersPoint {
    day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
    revenue: number;
    orders: number;
}

export type RevenueOrdersData = RevenueOrdersPoint[];