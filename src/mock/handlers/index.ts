import { http, passthrough } from "msw";
import { userHandlers } from "./user.handlers";

export const handlers = [
  ...userHandlers,

  http.get("https://api.dicebear.com/*", () => passthrough()),
  http.get("https://images.unsplash.com/*", () => passthrough()),
];
