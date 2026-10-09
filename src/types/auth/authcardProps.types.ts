export type AuthCardProps = {
  title: string;
  subtitle: string;
  //   logoSrc?: string;
  titleSize?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "login" | "signup" | "plain";
};
