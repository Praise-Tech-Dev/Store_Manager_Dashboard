import { Search, X } from "lucide-react";
import { forwardRef } from "react";

export interface SearchInputProps extends Omit<React.ComponentPropsWithoutRef<"input">, "size"> {
    onClear: () => void;
    containerClassName?: string;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
    (
        {
        value,
        onChange,
        onClear,
        placeholder = "Search...",
        className = "",
        containerClassName = "",
        disabled = false,
        ...rest
        },
        ref,
        ) => {
        
        const hasValue = Boolean(value && String(value).length > 0);

    return (
      <div
        className={`relative flex w-full items-center ${containerClassName}`}
      >
        <span className="pointer-events-none absolute left-3.5 flex items-center justify-center text-text-gray">
          <Search className="h-4 w-4" />
        </span>

        <input
          ref={ref}
          type="text"
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className={`
            w-full rounded-xl border border-transparent bg-[#F2F4F6] text-sm text-gray-900 placeholder-[#9CA3AF]
            transition-all duration-200 outline-none
            py-2.5 pl-10 pr-10
            hover:border-gray-200 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20
            disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-60
            ${className}
                `}
          {...rest}
        />

        {hasValue && onClear && !disabled && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 flex h-5 w-5 items-center justify-center rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600 focus:outline-none transition-colors"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    );
    }
);

SearchInput.displayName = "SearchInput";