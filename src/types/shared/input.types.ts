export type InputProps = {
  label?: string;
  error?: string;
  helperText?: string;
  // Accepts a Lucide icon component, <img />, or a direct string URL/path
  iconLeft?: React.ReactNode | string;
  iconRight?: React.ReactNode | string;
  isPassword?: boolean;
  containerClassName?: string;
  variant?: "filled" | "outline";
} & React.ComponentPropsWithoutRef<"input">;