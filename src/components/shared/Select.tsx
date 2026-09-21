import React, { forwardRef } from "react";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, options, error, helperText, className = "", id, ...props },
    ref,
  ) => {
    const inputId =
      id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-slate-700"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <select
            id={inputId}
            ref={ref}
            className={`w-full appearance-none rounded-lg border bg-white pl-4 py-2.5 pr-10 text-sm font-medium text-slate-800 outline-none transition
              ${
                error
                  ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                  : "border-slate-200 hover:border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
              }
              disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400
              ${className}
            `}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>

        {error ? (
          <p className="text-[11px] text-rose-500">{error}</p>
        ) : helperText ? (
          <p className="text-[11px] text-slate-400">{helperText}</p>
        ) : null}
      </div>
    );
  },
);

Select.displayName = "Select";
