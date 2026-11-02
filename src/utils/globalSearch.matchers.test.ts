import { describe, expect, it } from "vitest";
import { matchesOrder, matchesProduct, matchesUser } from "./globalsearch.matchers";

describe("matchesOrder", () => {
  const order = { orderNumber: "#ORD-9024", customerName: "Alex Rivera" };

  it.each(["#ORD-9024", "ord-9024", "9024"])("finds the order by %s", (q) => {
    expect(matchesOrder(order, q)).toBe(true);
  });

  it("finds the order by customer name", () => {
    expect(matchesOrder(order, "rivera")).toBe(true);
  });

  it("does not match an unrelated query", () => {
    expect(matchesOrder(order, "9999")).toBe(false);
  });
});

describe("matchesUser", () => {
  const user = {
    name: { firstname: "Sarah", lastname: "Jenkins" },
    email: "sarah.j@example.com",
  };

  it("matches the full name", () => {
    expect(matchesUser(user, "sarah jenkins")).toBe(true);
  });

  it("matches the email local part", () => {
    expect(matchesUser(user, "sarah.j")).toBe(true);
  });

  it("ignores the email domain unless the query has an @", () => {
    expect(matchesUser(user, "example")).toBe(false);
    expect(matchesUser(user, "@example")).toBe(true);
  });
});

describe("matchesProduct", () => {
  // use a real ProductCategory value if "electronics" doesn't type-check
  const product = {
    title: "WD 2TB Elements Portable External Hard Drive - USB 3.0",
    category: "electronics",
    sku: "W2-3-009",
  };

  it("matches title, category and sku, ignoring case", () => {
    expect(matchesProduct(product, "WD 2TB")).toBe(true);
    expect(matchesProduct(product, "electro")).toBe(true);
    expect(matchesProduct(product, "w2-3-009")).toBe(true);
  });

  it("does not match an unrelated query", () => {
    expect(matchesProduct(product, "keyboard")).toBe(false);
  });
});
