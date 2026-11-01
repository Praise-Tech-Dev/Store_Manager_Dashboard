import { useMemo } from "react";
import { ORDERS_MOCK_DATA } from "@/mock/data/orders.mock.data";
import { useOrderStore } from "@/store/useOrderStore";
import { buildOrders } from "@/utils/orders/buildOrders.utils";
import type { Order } from "@/types/orders";

export const useAllOrders = (): Order[] => {
  const createdOrders = useOrderStore((state) => state.createdOrders);
  const cancelledIds = useOrderStore((state) => state.cancelledIds);

  return useMemo(
    () =>
      buildOrders({
        seedOrders: ORDERS_MOCK_DATA,
        createdOrders,
        cancelledIds,
      }),
    [createdOrders, cancelledIds],
  );
};
