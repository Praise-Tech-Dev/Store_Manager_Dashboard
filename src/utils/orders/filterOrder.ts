import { ORDER_DATE_RANGE_DAYS } from "@/constants/orders";
import type { FilterOrdersParams, Order } from "@/types/orders";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export const filterOrders = ({ orders, filters, now = new Date(),}: FilterOrdersParams): Order[] => {
    const days = ORDER_DATE_RANGE_DAYS[filters.dateRange];

    const cutoff = days === null ? null : now.getTime() - days * MS_PER_DAY;

    return orders.filter((order) => {
        const matchesStatus = filters.status === "all" || order.paymentStatus === filters.status;

        const matchesDate =
          cutoff === null || new Date(order.date).getTime() >= cutoff;

        return matchesStatus && matchesDate;
    });
};