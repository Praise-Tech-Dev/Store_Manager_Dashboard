export interface MetricTrendPoint {
    value: number;
}

export interface MetricCardData {
    id: "revenue" | "users" | "orders" | "conversion";
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
    color: string;
    trend: MetricTrendPoint[];
}