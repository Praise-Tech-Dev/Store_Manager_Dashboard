export type Column<T> = {
  key: string;
  title: React.ReactNode;
  className?: string;
  render?: (row: T) => React.ReactNode;
};
