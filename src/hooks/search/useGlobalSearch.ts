import { useMemo } from "react";
import { useDashboardUsers } from "@/hooks/users/useDashboardUsers";
import {
  SEARCH_GROUP_LIMIT,
  SEARCH_MIN_LENGTH,
} from "@/constants/search.constants";
import type {
    BuildGroupParams,
  SearchResultGroup,
  UseGlobalSearchParams,
} from "@/types/shared/search.types";
import { useAllOrders } from "../orders/useAllOrders";
import { useDashboardProducts } from "../products";
import { matchesOrder, matchesProduct, matchesUser } from "@/utils/globalsearch.matchers";
import { ALL_TIME_RANGE } from "@/constants/orders";
import { formatCurrency } from "@/utils/statistics.utils";

const buildOrdersSearchHref = (term: string) => {
  const params = new URLSearchParams({ search: term, range: ALL_TIME_RANGE });
  return `/orders?${params.toString()}`;
};

const buildGroup = <T>({
  key,
  label,
  matches,
  toItem,
  viewAllHref,
}: BuildGroupParams<T>): SearchResultGroup => ({
  key,
  label,
  items: matches.slice(0, SEARCH_GROUP_LIMIT).map(toItem),
  totalMatches: matches.length,
  viewAllHref,
});

export const useGlobalSearch = ({ query, enabled }: UseGlobalSearchParams) => {
  const orders = useAllOrders(); 
  const usersQuery = useDashboardUsers({ enabled });
  const productsQuery = useDashboardProducts({ enabled });

  const trimmed = query.trim();
  const isSearching = trimmed.length >= SEARCH_MIN_LENGTH;

  const groups = useMemo<SearchResultGroup[]>(() => {
    if (!isSearching) return [];

    const encoded = encodeURIComponent(trimmed);

    const orderGroup = buildGroup({
      key: "orders",
      label: "Transactions",
      matches: orders.filter((o) => matchesOrder(o, trimmed)),
      toItem: (o) => ({
        id: `order-${o.id}`,
        title: o.orderNumber,
        subtitle: `${o.customerName} · ${formatCurrency(o.total)}`,
        href: buildOrdersSearchHref(o.orderNumber),
      }),
      viewAllHref: buildOrdersSearchHref(trimmed),
    });

    const userGroup = buildGroup({
      key: "users",
      label: "Users",
      matches: (usersQuery.data ?? []).filter((u) => matchesUser(u, trimmed)),
      toItem: (u) => ({
        id: `user-${u.id}`,
        title: `${u.name?.firstname ?? ""} ${u.name?.lastname ?? ""}`.trim(),
        subtitle: u.email,
        // email is unique and contains "@", so the Users page matches only this user
        href: `/users?search=${encodeURIComponent(u.email)}`,
      }),
      viewAllHref: `/users?search=${encoded}`,
    });

    const productGroup = buildGroup({
      key: "products",
      label: "Products",
      matches: (productsQuery.data ?? []).filter((p) =>
        matchesProduct(p, trimmed),
      ),
      toItem: (p) => ({
        id: `product-${p.id}`,
        title: p.title,
        subtitle: `${p.category} · ${p.sku}`,
        href: `/products?search=${encodeURIComponent(p.sku)}`,
      }),
      viewAllHref: `/products?search=${encoded}`,
    });

    // Hide empty groups so the dropdown only shows headings that have results
    return [orderGroup, userGroup, productGroup].filter(
      (g) => g.items.length > 0,
    );
  }, [isSearching, trimmed, orders, usersQuery.data, productsQuery.data]);

  const flatResults = useMemo(() => groups.flatMap((g) => g.items), [groups]);

  return {
    groups,
    flatResults,
    isSearching,
    isFetching: usersQuery.isFetching || productsQuery.isFetching,
  };
};
