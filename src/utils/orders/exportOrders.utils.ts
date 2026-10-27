import type { ExportOrdersParams } from "@/types/orders/orderExport.types";
import { createCsvRow, neutralizeFormula, triggerCsvDownload } from "../csv.utils";
import { formatCartId } from "../carts/cart.utils";
import { ORDER_EXPORT_FILE_NAMES, ORDER_EXPORT_HEADERS } from "@/constants/orders";
import { formatOrderDateTime } from "./order.utils";

const getExportRows = ({ tab, orders, carts, returns }: ExportOrdersParams) => {
  switch (tab) {
    case "all":
      return orders.map((order) => [
        order.orderNumber,
        neutralizeFormula(order.customerName),
        formatOrderDateTime({ date: order.date }),
        order.total,
        order.paymentStatus,
        order.shippingStatus,
      ]);

    case "pending":
      return carts.map((cart) => [
        formatCartId(cart.id),
        neutralizeFormula(cart.customerName),
        formatOrderDateTime({ date: cart.date }),
        cart.itemCount,
        cart.total,
      ]);
      
    case "returns":
        return returns.map((orderReturn) => [
          orderReturn.returnNumber,
          orderReturn.orderNumber,
          neutralizeFormula(orderReturn.customerName),
          formatOrderDateTime({ date: orderReturn.date }),
          orderReturn.reason,
          orderReturn.amount,
          orderReturn.status,
        ]);
      
  }
};

export const exportOrdersToCsv = (params: ExportOrdersParams) => {
  const rows = [
    createCsvRow(ORDER_EXPORT_HEADERS[params.tab]),
    ...getExportRows(params).map(createCsvRow),
  ];
  const date = new Date().toISOString().slice(0, 10);
  triggerCsvDownload(
    rows.join("\r\n"),
    `${ORDER_EXPORT_FILE_NAMES[params.tab]}-${date}.csv`,
  );
};
