import { TableSkeleton } from "./TableSkeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Identifiable, TableProps } from "@/types/table/table.types";
import { getPageNumbers, isPaginationDisabled } from "@/utils/pagination.utils";
import { useEffect, useState } from "react";

export function Table<T extends Identifiable>({
  columns,
  data = [],
  loading = false,
  emptyMessage = "No records found.",
  getRowKey = (row) => row.id ?? JSON.stringify(row),
  pagination,
  onClearFilters,
  skeletonRows,
  paginationVariant = "default",
  entityName = "entries",
  avatarVariant = "circle",
  activePageColorClass = "bg-primary text-white",
}: TableProps<T>) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 767px)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleResize = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const effectiveVariant = isMobile ? "default" : paginationVariant;

  // pagination calc
  let fromItem = 0;
  let toItem = 0;

  if (pagination) {
    const { currentPage, totalItems, pageSize } = pagination;
    fromItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    toItem = Math.min(currentPage * pageSize, totalItems);
  }

  // Inside Table component:
  const pageNumbers = pagination
    ? getPageNumbers({
        currentPage: pagination.currentPage,
        totalPages: pagination.totalPages,
        paginationVariant: effectiveVariant,
      })
    : [];

  const { isPrevDisabled, isNextDisabled } = pagination
    ? isPaginationDisabled(
        pagination.currentPage,
        pagination.totalPages,
        loading,
      )
    : { isPrevDisabled: true, isNextDisabled: true };

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-[#F2F4F6]">
            <tr>
              {columns.map((column, idx) => (
                <th
                  key={column.key}
                  scope="col"
                  className={`px-6 py-4 text-left text-[11px] font-semibold font-inter tracking-[0.55px] text-text-gray ${
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

          <tbody className="">
            {loading ? (
              <TableSkeleton
                rows={skeletonRows ?? pagination?.pageSize ?? 5}
                columnsCount={columns.length}
                avatarVariant={avatarVariant}
              />
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-5 py-12 text-center text-sm text-slate-500 sm:px-6 "
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
                  className="font-inter transition-colors hover:bg-slate-50/70"
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
        <div className="relative z-10 flex items-center justify-between border-t border-[#ECEEF0] px-6 py-4 font-inter font-normal text-xs leading-4 tracking-normal align-middle text-text-gray">
          <p className=" hidden md:block">
            Showing <span className="">{fromItem}</span> to{" "}
            <span className="">{toItem}</span> of{" "}
            <span className="">{pagination.totalItems}</span> {entityName}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isPrevDisabled}
              onClick={() =>
                pagination.onPageChange(pagination.currentPage - 1)
              }
              className={`flex items-center justify-center rounded-sm border border-border-subtle/30  transition hover:bg-slate-50 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent ${
                effectiveVariant === "detailed"
                  ? "px-3 py-1 text-base leading-6 tracking-normal font-normal text-center align-middle text-text-default"
                  : "bg-[#F2F4F6] h-8 w-8 text-text-gray"
              }`}
            >
              {effectiveVariant === "detailed" ? (
                "Previous"
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </button>

            {/* Render items from pageNumbers utility */}
            {pageNumbers.map((p, index) => {
              // Ellipsis rendering
              if (p === "...") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="flex h-8 w-8 items-center justify-center text-base text-text-gray leading-6 tracking-normal align-middle text-center"
                  >
                    ...
                  </span>
                );
              }

              // Numeric page button rendering
              const isActive = Number(p) === Number(pagination.currentPage);
              return (
                <button
                  key={p}
                  type="button"
                  disabled={loading}
                  onClick={() => pagination.onPageChange(p)}
                  className={`flex h-8 w-8 items-center justify-center rounded-sm text-base font-normal cursor-pointer transition ${
                    isActive
                      ? `${activePageColorClass} shadow-xs`
                      : "border border-slate-200 bg-[#F2F4F6] text-text-gray hover:bg-slate-50"
                  }`}
                >
                  {p}
                </button>
              );
            })}
            <button
              type="button"
              disabled={isNextDisabled}
              onClick={() =>
                pagination.onPageChange(pagination.currentPage + 1)
              }
              className={`flex items-center justify-center rounded-sm border border-border-subtle/30  transition hover:bg-slate-50 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent ${
                effectiveVariant === "detailed"
                  ? "px-3 py-1 text-base leading-6 tracking-normal font-normal text-center align-middle text-text-default"
                  : "bg-[#F2F4F6] h-8 w-8 text-text-gray"
              }`}
            >
              {effectiveVariant === "detailed" ? (
                "Next"
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
