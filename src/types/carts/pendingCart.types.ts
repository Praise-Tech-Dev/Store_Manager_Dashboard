export interface PendingCart {
  id: number;
  userId: number;
  customerName: string;
  date: string;
  itemCount: number;
  total: number;
}

export interface PendingCartsTableProps {
  carts: PendingCart[];
  page: number;
  loading: boolean;
  isError: boolean;
  onRetry: () => void;
  onPageChange: (page: number) => void;
}