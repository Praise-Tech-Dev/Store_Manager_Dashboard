export type CardProps = {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<"div">;