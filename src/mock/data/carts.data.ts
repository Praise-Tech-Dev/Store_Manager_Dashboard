import type { Cart } from "@/types/carts";

export const MOCK_CARTS: Cart [] = [
  {
    id: 1,
    userId: 1,
    date: "2020-03-02T00:00:02.000Z",
    products: [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 3 },
    ],
  },
  {
    id: 2,
    userId: 2,
    date: "2020-01-02T00:00:02.000Z",
    products: [
      { productId: 2, quantity: 1 },
      { productId: 3, quantity: 2 },
    ],
  },
  {
    id: 3,
    userId: 3,
    date: "2020-03-01T00:00:02.000Z",
    products: [
      { productId: 1, quantity: 1 },
      { productId: 3, quantity: 1 },
    ],
  },
];
