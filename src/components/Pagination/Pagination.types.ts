import React from "react";

/**
 * Pagination variant types
 */
export type PaginationVariant =
  | "default"
  | "primary"
  | "secondary"
  | "outlined"
  | "minimal"
  | "glass";

/**
 * Pagination size types
 */
export type PaginationSize = "sm" | "md" | "lg";

/**
 * Pagination shape types
 */
export type PaginationShape = "rounded" | "square" | "pill";

/**
 * Props for the Pagination component
 *
 * @example
 * ```tsx
 * <Pagination totalPages={10} currentPage={1} onPageChange={(page) => console.log(page)} />
 * <Pagination variant="primary" size="lg" totalPages={20} currentPage={5} />
 * <Pagination shape="pill" showFirstLast showPageNumbers={false} />
 * ```
 */
export interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * Visual style variant of the pagination
   * @default "default"
   */
  variant?: PaginationVariant;

  /**
   * Size of the pagination buttons
   * @default "md"
   */
  size?: PaginationSize;

  /**
   * Shape of the pagination buttons
   * @default "rounded"
   */
  shape?: PaginationShape;

  /**
   * Total number of pages
   */
  totalPages: number;

  /**
   * Current active page (1-indexed)
   * @default 1
   */
  currentPage?: number;

  /**
   * Callback when page changes
   */
  onPageChange?: (page: number) => void;

  /**
   * Number of page buttons to show on each side of current page
   * @default 1
   */
  siblingCount?: number;

  /**
   * Show first and last page buttons
   * @default true
   */
  showFirstLast?: boolean;

  /**
   * Show previous and next buttons
   * @default true
   */
  showPrevNext?: boolean;

  /**
   * Show page numbers
   * @default true
   */
  showPageNumbers?: boolean;

  /**
   * Custom label for previous button
   * @default "Previous"
   */
  previousLabel?: React.ReactNode;

  /**
   * Custom label for next button
   * @default "Next"
   */
  nextLabel?: React.ReactNode;

  /**
   * Custom label for first button
   * @default "First"
   */
  firstLabel?: React.ReactNode;

  /**
   * Custom label for last button
   * @default "Last"
   */
  lastLabel?: React.ReactNode;

  /**
   * Disable all buttons
   * @default false
   */
  disabled?: boolean;
}
