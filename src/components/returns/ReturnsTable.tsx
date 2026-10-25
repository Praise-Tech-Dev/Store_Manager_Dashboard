// components/orders/ReturnsTable.tsx
import { Badge } from "@/components/shared/Badge";
import { Table } from "@/components/shared/table/Table";
import { ORDERS_PAGE_SIZE, RETURN_BADGE_VARIANTS } from "@/constants/orders";
import type { OrderReturn, ReturnsTableProps } from "@/types/returns/return.types";
import type { Column } from "@/types/table/Column.types";
import { paginate } from "@/utils/pagination.utils";
import { CustomerCell } from "../shared/CustomerCell";
import { DateTimeCell } from "../shared/DateCell";
import { formatCurrency } from "@/utils/statistics.utils";

const RETURN_COLUMNS: Column<OrderReturn>[] = [
  {
    key: "return",
    title: "Return ID",
    render: (item) => (
      <span className="font-semibold text-primary">{item.returnNumber}</span>
    ),
  },
  {
    key: "order",
    title: "Order",
    render: (item) => item.orderNumber,
  },
  {
    key: "customer",
    title: "Customer",
    render: (item) => <CustomerCell name={item.customerName} />,
  },
  {
    key: "reason",
    title: "Reason",
    render: (item) => item.reason,
  },
  {
    key: "date",
    title: "Date",
    render: (item) => <DateTimeCell date={item.date} />,
  },
  {
    key: "amount",
    title: "Amount",
    className: "text-right",
    render: (item) => (
      <span className="tabular-nums">{formatCurrency(item.amount)}</span>
    ),
  },
  {
    key: "status",
    title: "Status",
    render: (item) => (
      <Badge variant={RETURN_BADGE_VARIANTS[item.status]}>{item.status}</Badge>
    ),
  },
];

export const ReturnsTable = ({
  returns,
  page,
  onPageChange,
}: ReturnsTableProps) => {
  const { items, ...pagination } = paginate({
    items: returns,
    page,
    pageSize: ORDERS_PAGE_SIZE,
  });

  return (
    <Table
      columns={RETURN_COLUMNS}
      data={items}
      pagination={{ ...pagination, onPageChange }}
      paginationVariant="detailed"
      entityName="returns"
      emptyMessage="No returns to process"
      tableHeaderBgColor="bg-transparent"
      showRowDividers
      showTableRadius={false}
    />
  );
};
