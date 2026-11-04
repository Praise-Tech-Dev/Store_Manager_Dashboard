import { describe, expect, it } from "vitest";
import type { SearchResultGroup } from "@/types/shared/search.types";
import {
  buildSearchNavigation,
  clampIndex,
  moveIndex,
} from "./searchNavigation.utils";

const makeGroup = (
  key: SearchResultGroup["key"],
  itemCount: number,
  totalMatches = itemCount,
): SearchResultGroup => ({
  key,
  label: key,
  items: Array.from({ length: itemCount }, (_, i) => ({
    id: `${key}-${i}`,
    title: `${key} ${i}`,
    subtitle: "",
    href: `/${key}/${i}`,
  })),
  totalMatches,
  viewAllHref: `/${key}?search=x`,
});

describe("buildSearchNavigation", () => {
  it("adds a View all row only when matches exceed the shown items", () => {
    const { hrefs, starts } = buildSearchNavigation([
      makeGroup("orders", 4, 6),
      makeGroup("users", 1),
    ]);

    expect(hrefs).toEqual([
      "/orders/0",
      "/orders/1",
      "/orders/2",
      "/orders/3",
      "/orders?search=x",
      "/users/0",
    ]);
    expect(starts).toEqual([0, 5]);
  });

  it("returns empty lists when there are no groups", () => {
    expect(buildSearchNavigation([])).toEqual({ hrefs: [], starts: [] });
  });
});

describe("clampIndex", () => {
  it("keeps an in-range index", () => {
    expect(clampIndex({ index: 2, length: 6 })).toBe(2);
  });

  it("pulls an out-of-range index back to the last row", () => {
    expect(clampIndex({ index: 9, length: 6 })).toBe(5);
  });

  it("returns -1 when the list is empty", () => {
    expect(clampIndex({ index: 3, length: 0 })).toBe(-1);
  });
});

describe("moveIndex", () => {
  it("moves one row in either direction", () => {
    expect(moveIndex({ current: 2, step: 1, length: 6 })).toBe(3);
    expect(moveIndex({ current: 2, step: -1, length: 6 })).toBe(1);
  });

  it("wraps around at both ends", () => {
    expect(moveIndex({ current: 5, step: 1, length: 6 })).toBe(0);
    expect(moveIndex({ current: 0, step: -1, length: 6 })).toBe(5);
  });
});
