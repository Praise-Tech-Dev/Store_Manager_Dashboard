export interface MetricTrendPoint {
    value: number;
}

export type MetricId = "revenue" | "users" | "orders" | "conversion";

export interface MetricCardData {
    id: MetricId;
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
    color: string;
    trend: MetricTrendPoint[];
}

export type MetricColorScheme = 'blue' | 'slate' | 'red';

export interface MetricCardProps {
    data: MetricCardData;
    className?: string;
}