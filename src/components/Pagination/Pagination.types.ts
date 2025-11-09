import React from "react";

/**
 * Visual style variant for the pagination component.
 */
export type PaginationVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "ghost"
  | "glass"
  | "outlined"
  | "minimal";

/**
 * Size variant for pagination buttons.
 */
export type PaginationSize = "sm" | "md" | "lg";

/**
 * Shape variant for pagination buttons.
 */
export type PaginationShape = "rounded" | "square" | "pill" | "circle";

/**
 * Props for the Pagination component.
 *
 * Pagination provides navigation controls for paginated content.
 * It implements accessible patterns with ARIA attributes and keyboard
 * navigation support.
 *
 * @example
 * // Basic pagination
 * <Pagination
 *   totalPages={10}
 *   currentPage={1}
 *   onPageChange={(page) => setCurrentPage(page)}
 * />
 *
 * @example
 * // Custom variant and size
 * <Pagination
 *   variant="primary"
 *   size="lg"
 *   totalPages={20}
 *   currentPage={5}
 *   onPageChange={handlePageChange}
 * />
 *
 * @example
 * // Minimal with custom labels
 * <Pagination
 *   variant="minimal"
 *   shape="pill"
 *   totalPages={50}
 *   currentPage={25}
 *   previousLabel="← Previous"
 *   nextLabel="Next →"
 *   onPageChange={setPage}
 * />
 *
 * @example
 * // Without first/last buttons
 * <Pagination
 *   totalPages={100}
 *   currentPage={50}
 *   showFirstLast={false}
 *   siblingCount={2}
 *   onPageChange={handlePageChange}
 * />
 *
 * @example
 * // With custom ARIA label
 * <Pagination
 *   totalPages={15}
 *   currentPage={3}
 *   onPageChange={setPage}
 *   aria-label="Search results pagination"
 * />
 */
export interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * Visual style variant of the pagination.
   * - `default`: Standard styling with base colors
   * - `primary`: Primary color scheme with gradient on active
   * - `secondary`: Secondary color scheme
   * - `accent`: Accent color highlights
   * - `ghost`: Minimal styling, transparent background
   * - `glass`: Glassmorphism effect with backdrop blur
   * - `outlined`: Outlined buttons with transparent background
   * - `minimal`: Minimal styling without borders
   *
   * @default 'default'
   *
   * @example
   * <Pagination variant="primary" totalPages={10} currentPage={1} />
   */
  variant?: PaginationVariant;

  /**
   * Size of the pagination buttons.
   * - `sm`: Small (h-8, text-sm)
   * - `md`: Medium (h-10, text-base) - default
   * - `lg`: Large (h-12, text-lg)
   *
   * @default 'md'
   *
   * @example
   * <Pagination size="lg" totalPages={10} currentPage={1} />
   */
  size?: PaginationSize;

  /**
   * Shape of the pagination buttons.
   * - `rounded`: Rounded corners (rounded-md)
   * - `square`: Sharp corners (rounded-none)
   * - `pill`: Fully rounded (rounded-full)
   * - `circle`: Circular buttons
   *
   * @default 'rounded'
   *
   * @example
   * <Pagination shape="pill" totalPages={10} currentPage={1} />
   */
  shape?: PaginationShape;

  /**
   * Total number of pages in the pagination.
   * Must be a positive integer.
   *
   * @example
   * <Pagination totalPages={20} currentPage={5} />
   */
  totalPages: number;

  /**
   * Current active page (1-indexed).
   * Should be between 1 and totalPages (inclusive).
   *
   * @default 1
   *
   * @example
   * <Pagination totalPages={10} currentPage={3} />
   */
  currentPage?: number;

  /**
   * Callback function called when the page changes.
   * Receives the new page number (1-indexed) as an argument.
   *
   * @example
   * <Pagination
   *   totalPages={10}
   *   currentPage={page}
   *   onPageChange={(newPage) => setPage(newPage)}
   * />
   *
   * @example
   * <Pagination
   *   totalPages={20}
   *   currentPage={currentPage}
   *   onPageChange={(page) => {
   *     setCurrentPage(page);
   *     fetchData(page);
   *   }}
   * />
   */
  onPageChange?: (page: number) => void;

  /**
   * Number of page buttons to show on each side of the current page.
   * Controls how many page numbers are visible around the active page.
   *
   * @default 1
   *
   * @example
   * // Shows: 1 ... 4 5 [6] 7 8 ... 20 (siblingCount = 2)
   * <Pagination totalPages={20} currentPage={6} siblingCount={2} />
   *
   * @example
   * // Shows: 1 ... 5 [6] 7 ... 20 (siblingCount = 1)
   * <Pagination totalPages={20} currentPage={6} siblingCount={1} />
   */
  siblingCount?: number;

  /**
   * Whether to show first and last page navigation buttons.
   * When true, displays buttons to jump to page 1 and the last page.
   *
   * @default true
   *
   * @example
   * <Pagination
   *   totalPages={50}
   *   currentPage={25}
   *   showFirstLast={false}
   * />
   */
  showFirstLast?: boolean;

  /**
   * Whether to show previous and next navigation buttons.
   * When true, displays buttons to go to the previous/next page.
   *
   * @default true
   *
   * @example
   * <Pagination
   *   totalPages={10}
   *   currentPage={5}
   *   showPrevNext={false}
   * />
   */
  showPrevNext?: boolean;

  /**
   * Whether to show individual page number buttons.
   * When false, only shows navigation buttons (first/prev/next/last).
   *
   * @default true
   *
   * @example
   * <Pagination
   *   totalPages={100}
   *   currentPage={50}
   *   showPageNumbers={false}
   * />
   */
  showPageNumbers?: boolean;

  /**
   * Custom content for the previous button.
   * If not provided, shows a left chevron icon.
   *
   * @example
   * <Pagination previousLabel="← Prev" totalPages={10} currentPage={5} />
   *
   * @example
   * <Pagination
   *   previousLabel={<ChevronLeft size={16} />}
   *   totalPages={10}
   *   currentPage={5}
   * />
   */
  previousLabel?: React.ReactNode;

  /**
   * Custom content for the next button.
   * If not provided, shows a right chevron icon.
   *
   * @example
   * <Pagination nextLabel="Next →" totalPages={10} currentPage={5} />
   *
   * @example
   * <Pagination
   *   nextLabel={<ChevronRight size={16} />}
   *   totalPages={10}
   *   currentPage={5}
   * />
   */
  nextLabel?: React.ReactNode;

  /**
   * Custom content for the first page button.
   * If not provided, shows a double left chevron icon.
   *
   * @example
   * <Pagination firstLabel="First" totalPages={20} currentPage={10} />
   *
   * @example
   * <Pagination
   *   firstLabel={<ChevronsLeft size={16} />}
   *   totalPages={20}
   *   currentPage={10}
   * />
   */
  firstLabel?: React.ReactNode;

  /**
   * Custom content for the last page button.
   * If not provided, shows a double right chevron icon.
   *
   * @example
   * <Pagination lastLabel="Last" totalPages={20} currentPage={10} />
   *
   * @example
   * <Pagination
   *   lastLabel={<ChevronsRight size={16} />}
   *   totalPages={20}
   *   currentPage={10}
   * />
   */
  lastLabel?: React.ReactNode;

  /**
   * Whether to disable all pagination buttons.
   * Useful when loading data or during navigation transitions.
   *
   * @default false
   *
   * @example
   * <Pagination
   *   totalPages={10}
   *   currentPage={5}
   *   disabled={isLoading}
   * />
   */
  disabled?: boolean;

  /**
   * Accessible label for the pagination navigation.
   * Helps screen reader users understand the purpose of the navigation.
   *
   * @default 'Pagination'
   *
   * @example
   * <Pagination
   *   totalPages={10}
   *   currentPage={5}
   *   aria-label="Search results pagination"
   * />
   *
   * @example
   * <Pagination
   *   totalPages={20}
   *   currentPage={10}
   *   aria-label="Blog posts navigation"
   * />
   */
  "aria-label"?: string;

  /**
   * Additional CSS classes to apply to the pagination container.
   *
   * @example
   * <Pagination
   *   totalPages={10}
   *   currentPage={5}
   *   className="justify-center mt-8"
   * />
   */
  className?: string;
}
