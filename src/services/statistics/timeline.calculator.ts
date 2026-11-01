import { WEEKDAYS } from "@/constants/statistics/statistics.constants";
import type { Order } from "@/types/orders";
import type { RevenueOrdersPoint } from "@/types/statistics";
import { countsAsOrder, countsAsRevenue } from "@/utils/orders";

export const calculateRevenueTimeline = (
  orders: Order[],
): RevenueOrdersPoint[] => {
  const dayLookup: Record<number, (typeof WEEKDAYS)[number]> = {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
  };

  const dayIncrements: Record<string, { revenue: number; orders: number }> = {
    Mon: { revenue: 0, orders: 0 },
    Tue: { revenue: 0, orders: 0 },
    Wed: { revenue: 0, orders: 0 },
    Thu: { revenue: 0, orders: 0 },
    Fri: { revenue: 0, orders: 0 },
    Sat: { revenue: 0, orders: 0 },
    Sun: { revenue: 0, orders: 0 },
  };

  orders.forEach((order) => {
    const dayName = dayLookup[new Date(order.date).getDay()];
    if (countsAsOrder(order)) dayIncrements[dayName].orders += 1;
    if (countsAsRevenue(order)) dayIncrements[dayName].revenue += order.total;
  });

  let accumulatedRevenue = 0;
  let accumulatedOrders = 0;

  return WEEKDAYS.map((day) => {
    accumulatedRevenue += dayIncrements[day].revenue;
    accumulatedOrders += dayIncrements[day].orders;

    return {
      day,
      revenue: Math.round(accumulatedRevenue * 100) /100,
      orders: accumulatedOrders,
    };
  });
};
