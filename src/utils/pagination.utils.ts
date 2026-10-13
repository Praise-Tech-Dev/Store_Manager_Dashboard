import type { PaginationParams } from "@/types/shared/pagination.types";


/**
 * Generates array of page numbers and ellipses based on pagination design variant.
 */
export const getPageNumbers = ({
  currentPage,
  totalPages,
  paginationVariant = "detailed",
}: PaginationParams): (number | "...")[] => {
  if (totalPages <= 0) return [];

  // Simple page array for Users page , up to totalPages (max 3 displayed)
  if (paginationVariant === "default" || totalPages <= 4) {
    return Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1);
  }

  // Near the start: [1, 2, 3, ..., totalPages]
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages];
  }

  // Near the end: [1, ..., totalPages - 2, totalPages - 1, totalPages]
  if (currentPage >= totalPages - 2) {
    return [1, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // In the middle: [1, "...", current - 1, current, current + 1, "...", totalPages]
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

// Checks whether pagination buttons should be disabled.
export const isPaginationDisabled = (
  currentPage: number,
  totalPages: number,
  loading: boolean,
) => ({
  isPrevDisabled: currentPage <= 1 || loading,
  isNextDisabled: currentPage >= totalPages || loading,
});
