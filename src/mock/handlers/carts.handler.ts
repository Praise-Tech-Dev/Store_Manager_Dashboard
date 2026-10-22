import { http, HttpResponse, bypass } from "msw";
import { CARTS_MOCK_DATA } from "../data/carts.mock.data";
import { fetchWithTimeout } from "../utils/fetchWithTimeout";

const BASE = "https://fakestoreapi.com";

export const cartsHandlers = [
  http.get(`${BASE}/carts`, async ({ request }) => {
    try {
      const live = await fetchWithTimeout(bypass(request));
      if (live.ok) {
        return live;
      }
    } catch (error) {
      console.info(
        "[MSW Fallback] GET /carts live request failed. Serving mock carts.",
        error,
      );
    }
    return HttpResponse.json(CARTS_MOCK_DATA);
  }),
];
