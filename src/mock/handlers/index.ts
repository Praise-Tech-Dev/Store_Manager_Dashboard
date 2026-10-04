import { http, passthrough } from "msw";
import { userHandlers } from "./user.handlers";
import { statisticsHandlers } from "./statistics.handlers";

export const handlers = [
  ...userHandlers,
  ...statisticsHandlers,

  http.get("https://api.dicebear.com/*", () => passthrough()),
  http.get("https://images.unsplash.com/*", () => passthrough()),
];
