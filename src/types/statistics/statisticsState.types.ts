export interface StatisticsErrorStateProps {
  error: Error | null;
  refetch: () => void | Promise<unknown>;
  isRetrying?: boolean;
}
