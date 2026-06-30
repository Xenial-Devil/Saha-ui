import { ReactNode } from "react";

/**
 * Slot-styling map for the Table compound component.
 *
 * Pass the same `classNames` object to `Table` and its sub-components;
 * each sub-component consumes only its own key. Individual `className`
 * props always win over the matching `classNames` key.
 */
export interface TableClassNames {
  /** Outer scroll container rendered by `Table`. */
  root?: string;
  /** The `<table>` element inside the container. */
  table?: string;
  /** `TableHeader` (`<thead>`). */
  header?: string;
  /** `TableBody` (`<tbody>`). */
  body?: string;
  /** `TableFooter` (`<tfoot>`). */
  footer?: string;
  /** Every `TableRow` (`<tr>`). */
  row?: string;
  /** Every `TableHead` (`<th>`). */
  head?: string;
  /** Every `TableCell` (`<td>`). */
  cell?: string;
}

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
export type TableSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl";

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
   * Slot-Styling API. A single object mapping Table slots to class strings.
   * `Table` consumes `classNames.root` and `classNames.table`. Forward the
   * same object to sub-components for their slots. Individual `className`
   * props always win over the matching `classNames` key.
   */
  classNames?: TableClassNames;

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
   * Slot-Styling API. Forward the same `classNames` object passed to `Table`;
   * `TableHeader` consumes `classNames.header`. Individual `className` wins.
   */
  classNames?: TableClassNames;

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
   * Slot-Styling API. Forward the same `classNames` object passed to `Table`;
   * `TableBody` consumes `classNames.body`. Individual `className` wins.
   */
  classNames?: TableClassNames;

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
   * Slot-Styling API. Forward the same `classNames` object passed to `Table`;
   * `TableFooter` consumes `classNames.footer`. Individual `className` wins.
   */
  classNames?: TableClassNames;

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
   * Slot-Styling API. Forward the same `classNames` object passed to `Table`;
   * `TableRow` consumes `classNames.row`. Individual `className` wins.
   */
  classNames?: TableClassNames;

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
   * Slot-Styling API. Forward the same `classNames` object passed to `Table`;
   * `TableHead` consumes `classNames.head`. Individual `className` wins.
   */
  classNames?: TableClassNames;

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
   * Slot-Styling API. Forward the same `classNames` object passed to `Table`;
   * `TableCell` consumes `classNames.cell`. Individual `className` wins.
   */
  classNames?: TableClassNames;

  /**
   * Cell content
   */
  children: ReactNode;
}
