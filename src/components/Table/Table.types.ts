import React from "react";

/**
 * Variant options for Table styling
 */
export type TableVariant =
  | "default"
  | "bordered"
  | "striped"
  | "glass"
  | "minimal";

/**
 * Size variants for table
 */
export type TableSize = "sm" | "md" | "lg";

/**
 * Density options
 */
export type TableDensity = "compact" | "normal" | "comfortable";

/**
 * Column alignment
 */
export type ColumnAlign = "left" | "center" | "right";

/**
 * Sort direction
 */
export type SortDirection = "asc" | "desc" | null;

/**
 * Column definition
 */
export interface TableColumn<T = any> {
  /**
   * Unique identifier for the column
   */
  id: string;

  /**
   * Column header label
   */
  header: React.ReactNode;

  /**
   * Accessor function or property name to get cell value
   */
  accessor?: keyof T | ((row: T) => any);

  /**
   * Custom cell renderer
   */
  cell?: (row: T, index: number) => React.ReactNode;

  /**
   * Column width (CSS value)
   */
  width?: string;

  /**
   * Minimum width
   */
  minWidth?: string;

  /**
   * Maximum width
   */
  maxWidth?: string;

  /**
   * Text alignment
   */
  align?: ColumnAlign;

  /**
   * Enable sorting for this column
   */
  sortable?: boolean;

  /**
   * Custom sort function
   */
  sortFn?: (a: T, b: T, direction: "asc" | "desc") => number;

  /**
   * Enable filtering for this column
   */
  filterable?: boolean;

  /**
   * Column footer content
   */
  footer?: React.ReactNode;

  /**
   * Whether column is sticky
   */
  sticky?: "left" | "right";

  /**
   * Additional CSS classes for header
   */
  headerClassName?: string;

  /**
   * Additional CSS classes for cells
   */
  cellClassName?: string;

  /**
   * Additional CSS classes for footer
   */
  footerClassName?: string;
}

/**
 * Props for the Table component
 */
export interface TableProps<T = any>
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Column definitions
   */
  columns: TableColumn<T>[];

  /**
   * Table data
   */
  data: T[];

  /**
   * Visual variant
   * @default "default"
   */
  variant?: TableVariant;

  /**
   * Size variant
   * @default "md"
   */
  size?: TableSize;

  /**
   * Density (row spacing)
   * @default "normal"
   */
  density?: TableDensity;

  /**
   * Show table borders
   * @default false
   */
  bordered?: boolean;

  /**
   * Enable row hover effect
   * @default true
   */
  hoverable?: boolean;

  /**
   * Enable striped rows
   * @default false
   */
  striped?: boolean;

  /**
   * Show table header
   * @default true
   */
  showHeader?: boolean;

  /**
   * Show table footer
   * @default false
   */
  showFooter?: boolean;

  /**
   * Enable row selection
   * @default false
   */
  selectable?: boolean;

  /**
   * Selected row keys
   */
  selectedRows?: (string | number)[];

  /**
   * Callback when row selection changes
   */
  onRowSelect?: (selectedRows: (string | number)[]) => void;

  /**
   * Row key accessor
   */
  rowKey?: keyof T | ((row: T) => string | number);

  /**
   * Enable sorting
   * @default false
   */
  sortable?: boolean;

  /**
   * Current sort state
   */
  sortBy?: { column: string; direction: SortDirection };

  /**
   * Callback when sort changes
   */
  onSort?: (column: string, direction: SortDirection) => void;

  /**
   * Loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Empty state message
   */
  emptyMessage?: React.ReactNode;

  /**
   * Caption for the table
   */
  caption?: React.ReactNode;

  /**
   * Make table responsive with horizontal scroll
   * @default true
   */
  responsive?: boolean;

  /**
   * Sticky header
   * @default false
   */
  stickyHeader?: boolean;

  /**
   * Max height for scrollable table
   */
  maxHeight?: string;

  /**
   * Custom row className
   */
  rowClassName?: string | ((row: T, index: number) => string);

  /**
   * Callback when row is clicked
   */
  onRowClick?: (row: T, index: number) => void;

  /**
   * Show loading overlay
   */
  loadingOverlay?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for Table subcomponents
 */
export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}
export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}
export interface TableFooterProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}
export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {}
export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {}
export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {}
