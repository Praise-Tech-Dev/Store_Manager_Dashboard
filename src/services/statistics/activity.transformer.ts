import { ACTIVITY_FEED_LIMIT, ACTIVITY_TITLE_MAX_LENGTH, DELETED_PRODUCT_LABEL } from "@/constants/statistics/statistics.constants";
import type { ActivityItem } from "@/types/statistics";
import type { ActivityTransformParams } from "@/types/statistics/calculatorParams.types";
import { countsAsOrder, formatOrderDateTime, sortOrdersByDate } from "@/utils/orders";
import { formatCurrency } from "@/utils/statistics.utils";

export const transformRecentActivities = ({
  orders,
  productMap,
}: ActivityTransformParams): ActivityItem[] =>
  sortOrdersByDate({ orders: orders.filter(countsAsOrder) })
    .slice(0, ACTIVITY_FEED_LIMIT)
    .map((order) => {
      const title =
        productMap.get(order.items[0]?.productId)?.title ??
        DELETED_PRODUCT_LABEL;
      const shortTitle =
        title.length > ACTIVITY_TITLE_MAX_LENGTH
          ? `${title.slice(0, ACTIVITY_TITLE_MAX_LENGTH)}...`
          : title;

      return {
        id: `act-order-${order.id}`,
        type: "order",
        title: `New Order ${order.orderNumber}`,
        description: `${order.customerName} purchased '${shortTitle}'`,
        amount: formatCurrency(order.total),
        timestamp: formatOrderDateTime({ date: order.date }),
      };
    });
