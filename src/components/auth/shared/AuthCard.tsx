import React from "react";
import { Card } from "../../shared/Card";
import logo from '../../../assets/icons/logo.svg'

export type AuthCardProps = {
  title: string;
  subtitle: string;
//   logoSrc?: string;
  titleSize?: string;
  children: React.ReactNode;
  className?: string;
};

export const AuthCard = ({
  title,
  subtitle,
  titleSize = "text-[32px]",
  //   logoSrc,
  children,
  className = "",
}: AuthCardProps) => {
  return (
    <Card
      className={`rounded-3xl border-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-8 py-10 ${className}`}
    >
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
