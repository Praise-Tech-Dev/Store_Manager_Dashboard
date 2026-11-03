import {
  DEFAULT_ORDER_FILTERS,
  ORDER_DATE_OPTIONS,
  ORDER_STATUS_OPTIONS,
  ORDER_TABS,
  ORDERS_PAGE_SIZE,
} from "@/constants/orders";
import type { OrderFilters, OrderTab } from "@/types/orders";
import { filterOrders, filterOrdersByPeriod, searchOrders } from "@/utils/orders";
import { parseSelectOption } from "@/utils/orders/parseSelectOption.utils";
import { sortOrdersByDate } from "@/utils/orders/sortOrders.utils";
import { paginate } from "@/utils/pagination.utils";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAllOrders } from "./useAllOrders";

export const useOrdersView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [now] = useState(() => new Date());
  const search = (searchParams.get("search") ?? "").trim();

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

  const clearSearch = () =>
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete("search");
      next.set("page", "1");
      return next;
    });

  // One call that resets everything, used by the table's empty state
  const clearFilters = () =>
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      ["status", "range", "search"].forEach((key) => next.delete(key));
      next.set("page", "1");
      return next;
    });

  // build, filter, sort, paginate
  const orders = useAllOrders();
  const periodOrders = useMemo(
    () => filterOrdersByPeriod({ orders, dateRange, now }),
    [orders, dateRange, now],
  );

  const filtered = useMemo(
    () => filterOrders({ orders, filters, now }),
    [orders, filters, now],
  );

  const searched = useMemo(
    () => searchOrders({ orders: filtered, search }),
    [filtered, search],
  );

  const sorted = useMemo(
    () => sortOrdersByDate({ orders: searched }),
    [searched],
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
    page,
    periodOrders,
    filteredOrders : sorted,
    search,
    clearSearch,
    clearFilters,
  };
};
