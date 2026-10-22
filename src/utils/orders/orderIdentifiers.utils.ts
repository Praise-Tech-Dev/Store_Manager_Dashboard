import type {
  FormatOrderNumberParams,
  GetNextOrderIdentifiersParams,
  ParseOrderNumberParams,
} from "@/types/orders/orderIdentifiers.types";

const ORDER_NUMBER_PREFIX = "#ORD-";

export const parseOrderNumber = ({ orderNumber }: ParseOrderNumberParams) =>
  Number.parseInt(orderNumber.replace(/\D/g, ""), 10) || 0;

export const formatOrderNumber = ({ value }: FormatOrderNumberParams): string =>
  `${ORDER_NUMBER_PREFIX}${value}`;

export const getNextOrderIdentifiers = ({
  orders,
}: GetNextOrderIdentifiersParams): { id: number; orderNumber: string } => {
  const highest = orders.reduce(
    (max, order) => ({
      id: Math.max(max.id, order.id),
      number: Math.max(
        max.number,
        parseOrderNumber({ orderNumber: order.orderNumber }),
      ),
    }),
    { id: 0, number: 0 },
  );

  return {
    id: highest.id + 1,
    orderNumber: formatOrderNumber({ value: highest.number + 1 }),
  };
};