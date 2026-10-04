import { http, HttpResponse, bypass } from "msw";
import { MOCK_PRODUCTS } from "../data/products.data";
import { MOCK_CARTS } from "../data/carts.data";

const BASE = "https://fakestoreapi.com";

export const statisticsHandlers = [
  // GET /products
  http.get(`${BASE}/products`, async ({ request }) => {
    try {
      const live = await fetch(bypass(request));
      if (live.ok) {
        return live;
      }
    } catch (error) {
      console.info(
        "[MSW Fallback] GET /products live request failed. Serving mock products.",
        error,
      );
    }
    return HttpResponse.json(MOCK_PRODUCTS);
  }),

  // GET /carts
  http.get(`${BASE}/carts`, async ({ request }) => {
    try {
      const live = await fetch(bypass(request));
      if (live.ok) {
        return live;
      }
    } catch (error) {
      console.info(
        "[MSW Fallback] GET /carts live request failed. Serving mock carts.",
        error,
      );
    }
    return HttpResponse.json(MOCK_CARTS);
  }),
];
