export const USER_KEYS = {
  all: ["users"] as const,
  detail: (id: number) => ["users", id] as const,
};
