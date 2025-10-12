import { ReactNode } from "react";

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
 * Table root component props
 */
export interface TableProps {
  /**
   * Visual variant for styling
   */
  variant?: TableVariant;

  /**
   * Size variant
   */
  size?: TableSize;

  /**
   * Density (spacing) of table cells
   */
  density?: TableDensity;

  /**
   * Enable striped rows
   */
  striped?: boolean;

  /**
   * Enable hover effect on rows
   */
  hoverable?: boolean;

  /**
   * Custom className for the table container
   */
  className?: string;

  /**
   * Child components (TableHeader, TableBody, TableFooter)
   */
  children: ReactNode;
}

/**
 * TableHeader props
 */
export interface TableHeaderProps {
  /**
   * Make header sticky
   */
  sticky?: boolean;

  /**
   * Custom className
   */
  className?: string;

  /**
   * Child TableRow component(s)
   */
  children: ReactNode;
}

/**
 * TableBody props
 */
export interface TableBodyProps {
  /**
   * Custom className
   */
  className?: string;

  /**
   * Child TableRow component(s)
   */
  children: ReactNode;
}

/**
 * TableFooter props
 */
export interface TableFooterProps {
  /**
   * Custom className
   */
  className?: string;

  /**
   * Child TableRow component(s)
   */
  children: ReactNode;
}

/**
 * TableRow props
 */
export interface TableRowProps {
  /**
   * Whether row is selected
   */
  selected?: boolean;

  /**
   * Custom className
   */
  className?: string;

  /**
   * Click handler
   */
  onClick?: () => void;

  /**
   * Child TableHead or TableCell component(s)
   */
  children: ReactNode;
}

/**
 * TableHead props (header cell)
 */
export interface TableHeadProps {
  /**
   * Text alignment
   */
  align?: ColumnAlign;

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
   * Enable sorting for this column
   */
  sortable?: boolean;

  /**
   * Current sort direction
   */
  sortDirection?: SortDirection;

  /**
   * Sort handler
   */
  onSort?: () => void;

  /**
   * Custom className
   */
  className?: string;

  /**
   * Cell content
   */
  children: ReactNode;
}

/**
 * TableCell props (body cell)
 */
export interface TableCellProps {
  /**
   * Text alignment
   */
  align?: ColumnAlign;

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
   * Custom className
   */
  className?: string;

  /**
   * Cell content
   */
  children: ReactNode;
}
