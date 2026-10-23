import {
  DEFAULT_ORDER_FILTERS,
  ORDER_DATE_OPTIONS,
  ORDER_STATUS_OPTIONS,
  ORDER_TABS,
  ORDERS_PAGE_SIZE,
} from "@/constants/orders";
import { ORDERS_MOCK_DATA } from "@/mock/data/orders.mock.data";
import { useOrderStore } from "@/store/useOrderStore";
import type { OrderFilters, OrderTab } from "@/types/orders";
import { filterOrders } from "@/utils/orders";
import { buildOrders } from "@/utils/orders/buildOrders.utils";
import { parseSelectOption } from "@/utils/orders/parseSelectOption.utils";
import { sortOrdersByDate } from "@/utils/orders/sortOrders.utils";
import { paginate } from "@/utils/pagination.utils";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useOrdersView = () => {
  const createdOrders = useOrderStore((state) => state.createdOrders);
  const cancelledIds = useOrderStore((state) => state.cancelledIds);
  const [searchParams, setSearchParams] = useSearchParams();
  const [now] = useState(() => new Date());

  // Read and validate view state from the URL
  const status = parseSelectOption({
    value: searchParams.get("status"),
    options: ORDER_STATUS_OPTIONS,
    fallback: DEFAULT_ORDER_FILTERS.status,
  });
  const dateRange = parseSelectOption({
    value: searchParams.get("range"),
    options: ORDER_DATE_OPTIONS,
    fallback: DEFAULT_ORDER_FILTERS.dateRange,
  });
  const tab = parseSelectOption({
    value: searchParams.get("tab"),
    options: ORDER_TABS,
    fallback: "all" as OrderTab,
  });
  const page = parseInt(searchParams.get("page") ?? "1", 10) || 1;

  const filters = useMemo<OrderFilters>(
    () => ({ status, dateRange }),
    [status, dateRange],
  );

  // Write view state to the URL
  const updateParams = (changes: Record<string, string>) =>
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      Object.entries(changes).forEach(([key, value]) => next.set(key, value));
      return next;
    });

  const updateFilters = (next: Partial<OrderFilters>) =>
    updateParams({
      ...(next.status && { status: next.status }),
      ...(next.dateRange && { range: next.dateRange }),
      page: "1",
    });

  const changeTab = (next: OrderTab) => updateParams({ tab: next, page: "1" });
  const setPage = (next: number) => updateParams({ page: String(next) });

  // Data pipeline: build, filter, sort, paginate
  const orders = useMemo(
    () =>
      buildOrders({
        seedOrders: ORDERS_MOCK_DATA,
        createdOrders,
        cancelledIds,
      }),
    [createdOrders, cancelledIds],
  );

  const filtered = useMemo(
    () => filterOrders({ orders, filters, now }),
    [orders, filters, now],
  );

  const sorted = useMemo(
    () => sortOrdersByDate({ orders: filtered }),
    [filtered],
  );

  const pagination = paginate({
    items: sorted,
    page,
    pageSize: ORDERS_PAGE_SIZE,
  });

  return {
    orders,
    visibleOrders: pagination.items,
    pagination,
    filters,
    tab,
    updateFilters,
    changeTab,
    setPage,
  };
};
