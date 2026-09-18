import { TableSkeleton } from "./TableSkeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Column } from "@/types/table/Column.types";
import type { PaginationConfig } from "@/types/table/PaginationConfig.types";



// Base constraint ensuring every row has at least an id or string/number key
export interface Identifiable {
  id?: string | number;
}
export type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  getRowKey?: (row: T) => string | number;
  pagination?: PaginationConfig;
  onClearFilters?: () => void;
};

export function Table<T extends Identifiable>({
  columns,
  data = [],
  loading = false,
  emptyMessage = "No records found.",
  getRowKey = (row) => row.id ?? JSON.stringify(row),
  pagination,
  onClearFilters,
}: TableProps<T>) {

  // pagination calc 
  const pages: number[] = []
  let fromItem = 0;
  let toItem = 0;

  if (pagination){
    const { currentPage, totalPages, totalItems, pageSize } = pagination;
    fromItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    toItem = Math.min(currentPage * pageSize, totalItems);

    for (let i = 1; i <= totalPages; i ++){
      pages.push(i);
    }

  }
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              {columns.map((column, idx) => (
                <th
                  key={column.key}
                  scope="col"
                  className={`px-6 py-4 text-left text-[11px] font-semibold tracking-[0.55px] text-text-gray sm:px-6 ${
                    column.className || ""
                  }`}
                >
                  {loading ? (
                    <div
                      className={`h-3 animate-pulse rounded bg-slate-200 ${
                        column.className?.includes("text-right")
                          ? "ml-auto w-14"
                          : idx === 0
                            ? "w-20"
                            : "w-16"
                      }`}
                    />
                  ) : (
                    column.title
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <TableSkeleton rows={5} columnsCount={columns.length} />
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-5 py-12 text-center text-sm text-slate-500 sm:px-6"
                >
                  <p>{emptyMessage}</p>
                  {onClearFilters && (
                    <button
                      type="button"
                      onClick={onClearFilters}
                      className="mt-2 text-xs font-semibold text-primary hover:underline cursor-pointer"
                    >
                      Clear all filters
                    </button>
                  )}
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={getRowKey(row)}
                  className="transition-colors hover:bg-slate-50/70"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`whitespace-nowrap px-5 py-4 text-sm text-slate-700 sm:px-6 ${
                        column.className || ""
                      }`}
                    >
                      {column.render
                        ? column.render(row)
                        : (row as Record<string, unknown>)[column.key] !==
                            undefined
                          ? String((row as Record<string, unknown>)[column.key])
                          : null}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* pagination footer  */}
      {pagination && (
        <div className="relative z-10 flex items-center justify-between border-t border-slate-100 px-6 py-4">
          <p className="text-xs text-slate-500 hidden md:block">
            Showing{" "}
            <span className="font-medium text-slate-700">{fromItem}</span> to{" "}
            <span className="font-medium text-slate-700">{toItem}</span> of{" "}
            <span className="font-medium text-slate-700">
              {pagination.totalItems}
            </span>{" "}
            entries
          </p>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={pagination.currentPage <= 1 || loading}
              onClick={() =>
                pagination.onPageChange(pagination.currentPage - 1)
              }
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:bg-slate-50 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 "
            >
              <ChevronLeft className="h-4 -4" />
            </button>
            {pages.map((p) => {
              const isActive = p === pagination.currentPage;
              return (
                <button
                  key={p}
                  type="button"
                  disabled={loading}
                  onClick={() => pagination.onPageChange(p)}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold cursor-pointer transition
                    ${
                      isActive
                        ? "bg-primary text-white shadow-xs"
                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }
                    `}
                >
                  {p}
                </button>
              );
            })}

            <button
              type="button"
              disabled={
                pagination.currentPage >= pagination.totalPages || loading
              }
              onClick={() =>
                pagination.onPageChange(pagination.currentPage + 1)
              }
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:bg-slate-50 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="h-4 -4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
