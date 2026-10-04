export const statisticsKeys = {
  all: ["statistics"] as const,
  overview: () => [...statisticsKeys.all, "overview"] as const,
  byRange: (range: string) => [...statisticsKeys.all, range] as const,
};
