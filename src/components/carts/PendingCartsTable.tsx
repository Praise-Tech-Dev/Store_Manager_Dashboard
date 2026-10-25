import { ORDERS_PAGE_SIZE } from "@/constants/orders";
import type { PendingCart, PendingCartsTableProps } from "@/types/carts/pendingCart.types";
import type { Column } from "@/types/table/Column.types";
import { paginate } from "@/utils/pagination.utils";
import { Table } from "../shared/table/Table";
import { formatCartId } from "@/utils/carts/cart.utils";
import { CustomerCell } from "../shared/CustomerCell";
import { DateTimeCell } from "../shared/DateCell";
import { formatCurrency } from "@/utils/statistics.utils";
import Button from "../shared/Button";

const PENDING_CART_COLUMNS: Column<PendingCart>[] = [
  {
    key: "cart",
    title: "Cart ID",
    render: (cart) => (
      <span className="font-semibold text-primary">
        {formatCartId(cart.id)}
      </span>
    ),
  },
  {
    key: "customer",
    title: "Customer",
    render: (cart) => <CustomerCell name={cart.customerName} />,
  },
  {
    key: "date",
    title: "Last Activity",
    render: (cart) => <DateTimeCell date={cart.date} />,
  },
  {
    key: "items",
    title: "Items",
    render: (cart) => cart.itemCount,
  },
  {
    key: "total",
    title: "Cart Value",
    className: "text-right",
    render: (cart) => (
      <span className="tabular-nums">{formatCurrency(cart.total)}</span>
    ),
  },
];
export const PendingCartsTable = ({
  carts,
  page,
  loading,
  isError,
  onRetry,
  onPageChange,
}: PendingCartsTableProps) => {
  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
        <p className="text-sm text-text-gray">Couldn't load pending carts.</p>
        <Button variant="outline" size="xs" onClick={onRetry}>
          Try again
        </Button>
      </div>
    );
  }

  const { items, ...pagination } = paginate({
    items: carts,
    page,
    pageSize: ORDERS_PAGE_SIZE,
  });

  return (
    <Table
      columns={PENDING_CART_COLUMNS}
      data={items}
      loading={loading}
      pagination={{ ...pagination, onPageChange }}
      paginationVariant="detailed"
      entityName="carts"
      emptyMessage="No pending carts."
      tableHeaderBgColor="bg-transparent"
      showRowDividers
      showTableRadius={false}
    />
  );
};
