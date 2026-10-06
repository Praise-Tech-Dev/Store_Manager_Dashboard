import React from "react";
import Button from "@/components/shared/Button";
import type { StatisticsErrorStateProps } from "@/types/statistics/statisticsState.types";

export const StatisticsErrorState: React.FC<StatisticsErrorStateProps> = ({
  error,
  refetch,
  isRetrying = false,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-600">
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <p className="text-base font-semibold text-slate-900">
        Failed to load statistics
      </p>
      <p className="mt-1 max-w-sm text-sm text-slate-500">
        {error?.message || "Something went wrong while fetching data."}
      </p>

      <div className="mt-5">
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isRetrying}
        >
          {isRetrying ? "Retrying..." : "Try Again"}
        </Button>
      </div>
    </div>
  );
};

export default StatisticsErrorState;
