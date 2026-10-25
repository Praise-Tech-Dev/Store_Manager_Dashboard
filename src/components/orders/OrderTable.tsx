import { PAYMENT_BADGE_STYLES, SHIPPING_DOT_COLORS } from "@/constants/orders";
import type { Order } from "@/types/orders";
import type { Column } from "@/types/table/Column.types";
import { Badge } from "../shared/Badge";
import { Table } from "../shared/table/Table";
import { formatCurrency } from "@/utils/statistics.utils";
import type { OrderTableProps } from "@/types/orders/orderProps.types";
import { CustomerCell } from "../shared/CustomerCell";
import { DateTimeCell } from "../shared/DateCell";



const orderColumns: Column<Order>[] = [
  {
    key: "orderId",
    title: "Order ID",
    render: (order) => (
      <div className="font-semibold text-primary">{order.orderNumber}</div>
    ),
  },
  {
    key: "customer",
    title: "Customer",
    render: (order) => <CustomerCell name={order.customerName}/>,
  },
  {
    key: "date",
    title: "Date",
    render: (order) => <DateTimeCell date={order.date}/>,
  },
  {
    key: "total",
    title: "Total Amount",
    render: (order) => (
      <span className="tabular-nums">{formatCurrency(order.total)}</span>
    ),
  },
  {
    key: "payment",
    title: "Payment",
    render: (order) => (
      <Badge variant={PAYMENT_BADGE_STYLES[order.paymentStatus]}>
        {order.paymentStatus}
      </Badge>
    ),
  },
  {
    key: "shipping",
    title: "Shipping",
    render: (order) => (
      <div className="flex items-center gap-2">
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: SHIPPING_DOT_COLORS[order.shippingStatus] }}
        />
        <span>{order.shippingStatus}</span>
      </div>
    ),
  },
];

export const OrderTable = ({
    orders,
    pagination,
    onClearFilters,
}: OrderTableProps) => {
    
          
        

        return (
          <Table
            columns={orderColumns}
            data={orders}
            pagination={pagination}
            emptyMessage="No orders match your criteria"
            onClearFilters={onClearFilters}
            paginationVariant="default"
            entityName="orders"
            avatarVariant="circle"
            tableHeaderBgColor="bg-transparent"
            showRowDividers
            showTableRadius= {false}
          />
        );
}