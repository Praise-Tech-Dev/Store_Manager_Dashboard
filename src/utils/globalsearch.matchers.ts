import type { Order } from "@/types/orders";
import type { DashboardUser } from "@/types/user.types";
import type { DashboardProduct } from "@/types/products";

const normalize = (text: string) => text.trim().toLowerCase();

const stripHash = (text: string) => text.replace(/^#/, "");

export const matchesOrder = (
  order: Pick<Order, "orderNumber" | "customerName">,
  query: string,
): boolean => {
  const q = stripHash(normalize(query));
  const orderNumber = stripHash(normalize(order.orderNumber));
  return orderNumber.includes(q) || normalize(order.customerName).includes(q);
};

export const matchesUser = (
  user: Pick<DashboardUser, "name" | "email">,
  query: string,
): boolean => {
  const q = normalize(query);
  const fullName =
    `${user.name?.firstname ?? ""} ${user.name?.lastname ?? ""}`.toLowerCase();
  const email = (user.email ?? "").toLowerCase();
  // Domain is only searchable when the query contains "@"
  const emailTarget = q.includes("@") ? email : email.split("@")[0];
  return fullName.includes(q) || emailTarget.includes(q);
};

export const matchesProduct = (
  product: Pick<DashboardProduct, "title" | "category" | "sku">,
  query: string,
): boolean => {
  const q = normalize(query);
  return (
    product.title.toLowerCase().includes(q) ||
    product.category.toLowerCase().includes(q) ||
    (product.sku ?? "").toLowerCase().includes(q)
  );
};
