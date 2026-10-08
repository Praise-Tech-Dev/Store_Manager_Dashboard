import { useState, useRef, useEffect } from "react";
import { Calendar } from "lucide-react";
import type { TimeframeSelectProps } from "@/types/statistics/exportReport/timeFrameSelect.types";
import { TIMEFRAME_OPTIONS } from "@/constants/statistics/timeframeOptions.constants";


export const TimeframeSelect = ({ value, onChange }: TimeframeSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-full bg-[#E6E8EA] px-4 py-2 text-xs font-medium text-text-gray  hover:bg-slate-100 cursor-pointer"
      >
        <Calendar className="h-3.75 w-[13.5px] text-slate-500" />
        <span className="font-inter font-normal text-sm leading-5 text-center align-middle">
          {value}
        </span>
      </button>

      {isOpen && (
        <ul className="absolute right-0 z-20 mt-2 w-44 rounded-xl border border-slate-100 bg-white py-1 shadow-lg ring-1 ring-black/5">
          {TIMEFRAME_OPTIONS.map((option) => (
            <li key={option}>
              <button
                type="button"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-slate-50 ${
                  value === option
                    ? "font-semibold text-primary"
                    : "text-slate-700"
                }`}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
