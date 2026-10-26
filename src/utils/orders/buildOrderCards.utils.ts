import type { BuildOrderCardsParams, OrderCardData } from "@/types/orders";
import { formatCurrency } from "../statistics.utils";

export const buildOrderCards = ({
  kpis,
  periodLabel,
  cartsLoading,
  cartsError,
}: BuildOrderCardsParams): OrderCardData[] => [
  {
    id: "totalOrders",
    label: `Total Orders (${periodLabel})`,
    value: kpis.totalOrders,
    subtext: "↑ 14.5% vs previous period",
    tone: "positive",
  },
  {
    id: "revenue",
    label: `Revenue (${periodLabel})`,
    value: formatCurrency(kpis.revenue),
    subtext: "↑ 8.2% vs previous period",
    tone: "positive",
  },
  {
    id: "abandonedCarts",
    label: "Abandoned Carts",
    value: cartsError ? "—" : kpis.abandonedCarts,
    subtext: "↓ -2.1% recovery rate",
    tone: "negative",
    loading: cartsLoading,
  },
  {
    id: "pendingReturns",
    label: "Pending Returns",
    value: kpis.pendingReturnsCount,
    subtext: `Est. value ${formatCurrency(kpis.pendingReturnsAmount)}`,
    tone: "neutral",
  },
];
