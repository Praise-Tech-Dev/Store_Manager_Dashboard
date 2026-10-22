import { http, HttpResponse, bypass } from "msw";
import { PRODUCTS_MOCK_DATA } from "../data/products.mock.data";
import { fetchWithTimeout } from "../utils/fetchWithTimeout";
// import { CARTS_MOCK_DATA } from "../data/carts.data";

const BASE = "https://fakestoreapi.com";

export const statisticsHandlers = [
  // GET /products
  http.get(`${BASE}/products`, async ({ request }) => {
    try {
      const live = await fetchWithTimeout(bypass(request));
      if (live.ok) {
        return live;
      }
    } catch (error) {
      console.info(
        "[MSW Fallback] GET /products live request failed. Serving mock products.",
        error,
      );
    }
    return HttpResponse.json(PRODUCTS_MOCK_DATA);
  }),
];
