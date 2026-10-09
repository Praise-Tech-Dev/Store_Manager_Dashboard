import { Card } from "../shared/Card";
import logo from "../../assets/icons/logo.svg";
import type { AuthCardProps } from "@/types/auth/authcardProps.types";


export const AuthCard = ({
  title,
  subtitle,
  titleSize = "text-[32px]",
  variant = "plain",
  children,
  className = "",
}: AuthCardProps) => {
  return (
    <Card
      className={`relative rounded-2xl border-0 shadow-[0_8px_10px_-6px_#0000001a,0_20px_25px_-5px_#0000001a] px-8 py-10 ${className}overflow-hidden bg-surface-light`}
    >
      {variant === "signup" && (
        <>
          {/* Top-Right Arc */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-primary/5"
          />
          {/* Bottom-Left Arc */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-14 -left-15 h-32 w-32 rounded-full bg-[#505F76]/5"
          />
        </>
      )}

      {/* login variant gradient */}
      {variant === "login" && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-14 -left-15 h-32 w-32 rounded-full bg-[#505F76]/10 blur-2xl"
          />
        </>
      )}
      {/* Centered Auth Header */}
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 p-2 shadow-sm">
          <img src={logo} alt="Logo" className="h-full w-full object-contain" />
        </div>
        <h1 className={`${titleSize} font-bold tracking-tight text-gray-900`}>
          {title}
        </h1>
        <p className="mt-2 text-sm text-gray-500">{subtitle}</p>
      </div>

      {/* Form Content */}
      {children}
    </Card>
  );
};
