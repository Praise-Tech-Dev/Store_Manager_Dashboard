import type { OrderCardData, UseOrderCardsParams } from "@/types/orders";
import { usePendingCarts } from "../carts/usePendingCarts";
import { getOrderCardValues } from "@/utils/orders/getOrdersCardValues.utils";
import { RETURN_MOCK_DATA } from "@/mock/data/returns.mock.data";
import { buildOrderCards } from "@/utils/orders/buildOrderCards.utils";
import { ORDER_DATE_SHORT_LABELS } from "@/constants/orders/orderCard.constants";


export const useOrderCards = ({
  orders,
  dateRange,
}: UseOrderCardsParams): OrderCardData[] => {
  const { data: pendingCarts = [], isPending, isError } = usePendingCarts();

  const kpis = getOrderCardValues({
    orders,
    returns: RETURN_MOCK_DATA,
    pendingCarts,
  });

  return buildOrderCards({
    kpis,
    periodLabel: ORDER_DATE_SHORT_LABELS[dateRange],
    cartsLoading: isPending,
    cartsError: isError,
  });
};
