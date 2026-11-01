import { ORDER_DATE_RANGE_DAYS } from "@/constants/orders";
import { MS_PER_DAY } from "@/constants/time.constants";
import type { FilterOrdersParams, Order } from "@/types/orders";


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