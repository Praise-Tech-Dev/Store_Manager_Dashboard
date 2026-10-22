import { http, passthrough } from "msw";
import { userHandlers } from "./user.handlers";
import { statisticsHandlers } from "./statistics.handlers";
import { cartsHandlers } from "./carts.handler";

export const handlers = [
  ...userHandlers,
  ...statisticsHandlers,
  ...cartsHandlers,

  http.get("https://api.dicebear.com/*", () => passthrough()),
  http.get("https://images.unsplash.com/*", () => passthrough()),
];
