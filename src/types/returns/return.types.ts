export type ReturnStatus = "Requested" | "Approved" | "Refunded";

export type ReturnReason =
  | "Damaged item"
  | "Wrong item"
  | "Not as described"
  | "Changed mind";

export interface OrderReturn {
  id: number;
  returnNumber: string;
  orderNumber: string;
  customerName: string;
  date: string;
  amount: number;
  reason: ReturnReason;
  status: ReturnStatus;
}

export interface ReturnsTableProps {
  returns: OrderReturn[];
  page: number;
  onPageChange: (page: number) => void;
}