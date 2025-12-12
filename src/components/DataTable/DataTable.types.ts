import { ReactNode } from "react";

/**
 * Sort direction type
 */
export type SortDirection = "asc" | "desc" | null;

/**
 * Column definition for DataTable
 */
export interface ColumnDef<TData = any, TValue = any> {
  /** Unique identifier for the column */
  id?: string;

  /** Key to access data in the row object */
  accessorKey?: keyof TData;

  /** Custom accessor function */
  accessorFn?: (row: TData) => TValue;

  /** Header content or render function */
  header?:
    | ReactNode
    | ((props: { column: Column<TData, TValue> }) => ReactNode);

  /** Cell render function */
  cell?: (props: {
    row: Row<TData>;
    value: TValue;
    column: Column<TData, TValue>;
  }) => ReactNode;

  /** Footer content or render function */
  footer?:
    | ReactNode
    | ((props: { column: Column<TData, TValue> }) => ReactNode);

  /** Enable sorting for this column - default: true */
  enableSorting?: boolean;

  /** Enable filtering for this column - default: true */
  enableFiltering?: boolean;

  /** Enable visibility toggle for this column - default: true */
  enableHiding?: boolean;

  /** Column size */
  size?: number;

  /** Minimum column size */
  minSize?: number;

  /** Maximum column size */
  maxSize?: number;

  /** Custom sort function */
  sortingFn?: (rowA: Row<TData>, rowB: Row<TData>, columnId: string) => number;

  /** Custom filter function */
  filterFn?: (row: Row<TData>, columnId: string, filterValue: any) => boolean;

  /** Custom className for header */
  headerClassName?: string;

  /** Custom className for cells */
  cellClassName?: string;
}

/**
 * Column instance
 */
export interface Column<TData = any, TValue = any> {
  id: string;
  columnDef: ColumnDef<TData, TValue>;
  getIsSorted: () => SortDirection;
  getToggleSortingHandler: () => () => void;
  getIsVisible: () => boolean;
  toggleVisibility: (value?: boolean) => void;
}

/**
 * Row instance
 */
export interface Row<TData = any> {
  id: string;
  index: number;
  original: TData;
  getValue: (columnId: string) => any;
  getIsSelected: () => boolean;
  toggleSelected: (value?: boolean) => void;
  getVisibleCells: () => Cell<TData>[];
}

/**
 * Cell instance
 */
export interface Cell<TData = any, TValue = any> {
  id: string;
  column: Column<TData, TValue>;
  row: Row<TData>;
  getValue: () => TValue;
}

/**
 * Sorting state
 */
export interface SortingState {
  id: string;
  desc: boolean;
}

/**
 * Column filter state
 */
export interface ColumnFilter {
  id: string;
  value: any;
}

/**
 * Column filters state (array of filters)
 */
export type ColumnFiltersState = ColumnFilter[];

/**
 * Column visibility state
 */
export type VisibilityState = Record<string, boolean>;

/**
 * Row selection state
 */
export type RowSelectionState = Record<string, boolean>;

/**
 * Pagination state
 */
export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

/**
 * Table instance
 */
export interface TableInstance<TData = any> {
  getRowModel: () => { rows: Row<TData>[] };
  getHeaderGroups: () => HeaderGroup<TData>[];
  getState: () => TableState;
  setPageIndex: (pageIndex: number) => void;
  setPageSize: (pageSize: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  getCanNextPage: () => boolean;
  getCanPreviousPage: () => boolean;
  getPageCount: () => number;
  setGlobalFilter: (filter: string) => void;
  setSorting: (sorting: SortingState[]) => void;
  setColumnFilters: (filters: ColumnFiltersState) => void;
  setColumnVisibility: (visibility: VisibilityState) => void;
  setRowSelection: (selection: RowSelectionState) => void;
  getFilteredRowModel: () => { rows: Row<TData>[] };
}

/**
 * Header group
 */
export interface HeaderGroup<TData = any> {
  id: string;
  headers: Header<TData>[];
}

/**
 * Header instance
 */
export interface Header<TData = any> {
  id: string;
  column: Column<TData>;
  isPlaceholder: boolean;
  colSpan: number;
}

/**
 * Table state
 */
export interface TableState {
  sorting: SortingState[];
  columnFilters: ColumnFiltersState;
  columnVisibility: VisibilityState;
  rowSelection: RowSelectionState;
  pagination: PaginationState;
  globalFilter: string;
}

/**
 * DataTable variant types
 */
export type DataTableVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "outline"
  | "glass";

/**
 * DataTable size types
 */
export type DataTableSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl";

/**
 * DataTable striped types
 */
export type DataTableStriped = "none" | "odd" | "even";

/**
 * Props for the DataTable component
 *
 * @example
 * ```tsx
 * <DataTable
 *   data={users}
 *   columns={userColumns}
 *   variant="primary"
 *   pagination
 * />
 * ```
 */
export interface DataTableProps<TData, TValue = unknown> {
  /** Column definitions */
  columns: ColumnDef<TData, TValue>[];

  /** Data to display */
  data: TData[];

  /** Visual variant - default: "default" */
  variant?: DataTableVariant;

  /** Table size - default: "md" */
  size?: DataTableSize;

  /** Enable pagination - default: true */
  pagination?: boolean;

  /** Initial page size - default: 10 */
  pageSize?: number;

  /** Enable row selection - default: false */
  enableRowSelection?: boolean;

  /** Enable column filtering - default: true */
  enableFiltering?: boolean;

  /** Enable column visibility toggle - default: true */
  enableColumnVisibility?: boolean;

  /** Enable sorting - default: true */
  enableSorting?: boolean;

  /** Striped rows - default: "none" */
  striped?: DataTableStriped;

  /** Show borders - default: true */
  bordered?: boolean;

  /** Hoverable rows - default: true */
  hoverable?: boolean;

  /** Sticky header - default: false */
  stickyHeader?: boolean;

  /** Loading state - default: false */
  loading?: boolean;

  /** Loading component */
  loadingComponent?: ReactNode;

  /** Empty state message */
  emptyMessage?: string;

  /** Empty state component */
  emptyComponent?: ReactNode;

  /** Custom className for container */
  className?: string;

  /** Custom className for table */
  tableClassName?: string;

  /** Callback when row is clicked */
  onRowClick?: (row: TData) => void;

  /** Callback when sorting changes */
  onSortingChange?: (sorting: SortingState[]) => void;

  /** Callback when column filters change */
  onColumnFiltersChange?: (filters: ColumnFiltersState) => void;

  /** Callback when column visibility changes */
  onColumnVisibilityChange?: (visibility: VisibilityState) => void;

  /** Callback when row selection changes */
  onRowSelectionChange?: (selection: RowSelectionState) => void;

  /** Callback when pagination changes */
  onPaginationChange?: (pagination: PaginationState) => void;

  /** Controlled sorting state */
  sorting?: SortingState[];

  /** Controlled column filters state */
  columnFilters?: ColumnFiltersState;

  /** Controlled column visibility state */
  columnVisibility?: VisibilityState;

  /** Controlled row selection state */
  rowSelection?: RowSelectionState;

  /** Show pagination info - default: true */
  showPaginationInfo?: boolean;

  /** Show page size selector - default: true */
  showPageSize?: boolean;

  /** Page size options - default: [10, 20, 30, 50, 100] */
  pageSizeOptions?: number[];

  /** Enable global filter - default: false */
  enableGlobalFilter?: boolean;

  /** Global filter placeholder */
  globalFilterPlaceholder?: string;

  /** Callback to access table instance */
  onTableReady?: (table: TableInstance<TData>) => void;
}

/**
 * Compact API props for DataTable
 */
export interface DataTableCompactProps<TData, TValue = unknown>
  extends DataTableProps<TData, TValue> {
  /** Title for the table */
  title?: string;

  /** Description for the table */
  description?: string;

  /** Actions to display in header */
  headerActions?: ReactNode;
}
