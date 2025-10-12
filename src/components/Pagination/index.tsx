import React, { useMemo } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type { PaginationProps } from "./Pagination.types";

/**
 * Pagination button variant styles using CVA
 */
export const paginationVariants = cva(
  [
    // Base styles
    "inline-flex",
    "items-center",
    "justify-center",
    "font-medium",
    "transition-all",
    "duration-200",
    "border",
    "select-none",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
    "disabled:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-base-200",
          "text-base-content",
          "border-base-300",
          "hover:bg-base-300",
          "focus:ring-primary",
          "data-[active=true]:bg-primary",
          "data-[active=true]:!text-white",
          "data-[active=true]:border-primary",
          "data-[active=true]:font-semibold",
        ],
        primary: [
          "bg-primary/10",
          "text-primary",
          "border-primary/20",
          "hover:bg-primary/20",
          "focus:ring-primary",
          "data-[active=true]:bg-primary",
          "data-[active=true]:!text-white",
          "data-[active=true]:border-primary",
          "data-[active=true]:font-semibold",
        ],
        secondary: [
          "bg-secondary/10",
          "text-secondary",
          "border-secondary/20",
          "hover:bg-secondary/20",
          "focus:ring-secondary",
          "data-[active=true]:bg-secondary",
          "data-[active=true]:!text-white",
          "data-[active=true]:border-secondary",
          "data-[active=true]:font-semibold",
        ],
        outlined: [
          "bg-transparent",
          "text-base-content",
          "border-base-content/20",
          "hover:bg-base-content/5",
          "hover:border-base-content/30",
          "focus:ring-base-content/20",
          "data-[active=true]:bg-primary",
          "data-[active=true]:!text-white",
          "data-[active=true]:border-primary",
          "data-[active=true]:font-semibold",
        ],
        minimal: [
          "bg-transparent",
          "text-base-content",
          "border-transparent",
          "hover:bg-base-200",
          "focus:ring-primary",
          "data-[active=true]:bg-primary",
          "data-[active=true]:!text-white",
          "data-[active=true]:font-semibold",
        ],
      },
      size: {
        sm: ["h-8", "min-w-8", "px-2", "text-sm", "gap-1"],
        md: ["h-10", "min-w-10", "px-3", "text-base", "gap-1.5"],
        lg: ["h-12", "min-w-12", "px-4", "text-lg", "gap-2"],
      },
      shape: {
        rounded: ["rounded-md"],
        square: ["rounded-none"],
        pill: ["rounded-full"],
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      shape: "rounded",
    },
  }
);

/**
 * Helper function to generate page numbers array with ellipsis
 */
const generatePagination = (
  currentPage: number,
  totalPages: number,
  siblingCount: number
): (number | "ellipsis-left" | "ellipsis-right")[] => {
  // If total pages is less than 7, show all pages
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftEllipsis = leftSiblingIndex > 2;
  const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  // No ellipsis
  if (!shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Only right ellipsis
  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, "ellipsis-right", totalPages];
  }

  // Only left ellipsis
  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    );
    return [firstPageIndex, "ellipsis-left", ...rightRange];
  }

  // Both ellipsis
  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, i) => leftSiblingIndex + i
  );
  return [
    firstPageIndex,
    "ellipsis-left",
    ...middleRange,
    "ellipsis-right",
    lastPageIndex,
  ];
};

/**
 * Pagination Component
 *
 * A comprehensive pagination component with multiple variants, sizes, and customization options.
 * Supports ellipsis for large page counts and full keyboard navigation.
 *
 * @example
 * ```tsx
 * // Basic pagination
 * <Pagination totalPages={10} currentPage={1} onPageChange={(page) => setPage(page)} />
 *
 * // Custom variant and size
 * <Pagination variant="primary" size="lg" totalPages={20} currentPage={5} />
 *
 * // Minimal with custom labels
 * <Pagination
 *   variant="minimal"
 *   shape="pill"
 *   totalPages={50}
 *   currentPage={25}
 *   previousLabel="← Prev"
 *   nextLabel="Next →"
 * />
 * ```
 */
export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      variant = "default",
      size = "md",
      shape = "rounded",
      totalPages,
      currentPage = 1,
      onPageChange,
      siblingCount = 1,
      showFirstLast = true,
      showPrevNext = true,
      showPageNumbers = true,
      previousLabel,
      nextLabel,
      firstLabel,
      lastLabel,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    // Ensure currentPage is within valid range
    const validCurrentPage = Math.max(1, Math.min(currentPage, totalPages));

    // Generate pagination items
    const paginationItems = useMemo(
      () => generatePagination(validCurrentPage, totalPages, siblingCount),
      [validCurrentPage, totalPages, siblingCount]
    );

    const handlePageChange = (page: number) => {
      if (
        page < 1 ||
        page > totalPages ||
        page === validCurrentPage ||
        disabled
      ) {
        return;
      }
      onPageChange?.(page);
    };

    const iconSize = size === "sm" ? 16 : size === "lg" ? 20 : 18;

    return (
      <nav
        ref={ref}
        className={cn("flex items-center gap-1", className)}
        aria-label="Pagination"
        {...props}
      >
        {/* First Page Button */}
        {showFirstLast && (
          <button
            type="button"
            onClick={() => handlePageChange(1)}
            disabled={disabled || validCurrentPage === 1}
            className={cn(paginationVariants({ variant, size, shape }))}
            aria-label="Go to first page"
          >
            {firstLabel || (
              <svg
                width={iconSize}
                height={iconSize}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="11 17 6 12 11 7" />
                <polyline points="18 17 13 12 18 7" />
              </svg>
            )}
          </button>
        )}

        {/* Previous Button */}
        {showPrevNext && (
          <button
            type="button"
            onClick={() => handlePageChange(validCurrentPage - 1)}
            disabled={disabled || validCurrentPage === 1}
            className={cn(paginationVariants({ variant, size, shape }))}
            aria-label="Go to previous page"
          >
            {previousLabel || (
              <svg
                width={iconSize}
                height={iconSize}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            )}
          </button>
        )}

        {/* Page Numbers */}
        {showPageNumbers &&
          paginationItems.map((item, index) => {
            if (item === "ellipsis-left" || item === "ellipsis-right") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className={cn(
                    "inline-flex items-center justify-center",
                    size === "sm"
                      ? "h-8 min-w-8"
                      : size === "lg"
                      ? "h-12 min-w-12"
                      : "h-10 min-w-10",
                    "text-base-content/50"
                  )}
                  aria-hidden="true"
                >
                  ⋯
                </span>
              );
            }

            const pageNumber = item as number;
            const isActive = pageNumber === validCurrentPage;

            return (
              <button
                key={pageNumber}
                type="button"
                onClick={() => handlePageChange(pageNumber)}
                disabled={disabled}
                data-active={isActive}
                className={cn(paginationVariants({ variant, size, shape }))}
                aria-label={`Go to page ${pageNumber}`}
                aria-current={isActive ? "page" : undefined}
              >
                {pageNumber}
              </button>
            );
          })}

        {/* Next Button */}
        {showPrevNext && (
          <button
            type="button"
            onClick={() => handlePageChange(validCurrentPage + 1)}
            disabled={disabled || validCurrentPage === totalPages}
            className={cn(paginationVariants({ variant, size, shape }))}
            aria-label="Go to next page"
          >
            {nextLabel || (
              <svg
                width={iconSize}
                height={iconSize}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            )}
          </button>
        )}

        {/* Last Page Button */}
        {showFirstLast && (
          <button
            type="button"
            onClick={() => handlePageChange(totalPages)}
            disabled={disabled || validCurrentPage === totalPages}
            className={cn(paginationVariants({ variant, size, shape }))}
            aria-label="Go to last page"
          >
            {lastLabel || (
              <svg
                width={iconSize}
                height={iconSize}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="13 17 18 12 13 7" />
                <polyline points="6 17 11 12 6 7" />
              </svg>
            )}
          </button>
        )}
      </nav>
    );
  }
);

Pagination.displayName = "Pagination";

export default Pagination;
