import { useState, useMemo } from "react";
import { ComponentValidator } from "../../lib/validation";
import type {
  DataTableProps,
  DataTableVariant,
  DataTableSize,
  DataTableStriped,
} from "./DataTable.types";
import {
  dataTableVariants,
  tableWrapperVariants,
  tableHeaderVariants,
  tableRowVariants,
  tableCellVariants,
  paginationContainerVariants,
  loadingOverlayVariants,
} from "./DataTable.styles";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Loader2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useDataTable } from "./useDataTable";

// Valid variant values
const VALID_VARIANTS: DataTableVariant[] = [
  "default",
  "primary",
  "secondary",
  "accent",
  "success",
  "warning",
  "error",
  "info",
  "outline",
  "glass",
];

const VALID_SIZES: DataTableSize[] = ["sm", "md", "lg"];
const VALID_STRIPED: DataTableStriped[] = ["none", "odd", "even"];

/**
 * DataTable Component
 *
 * A feature-rich data table component with custom implementation.
 * Supports sorting, filtering, pagination, row selection, and column visibility.
 *
 * @example
 * ```tsx
 * const columns = [
 *   { accessorKey: "name", header: "Name" },
 *   { accessorKey: "email", header: "Email" },
 * ];
 *
 * <DataTable
 *   data={users}
 *   columns={columns}
 *   variant="primary"
 *   pagination
 * />
 * ```
 */
export const DataTable = <TData, TValue = unknown>({
  columns,
  data,
  variant = "default",
  size = "md",
  pagination = true,
  pageSize = 10,
  enableRowSelection = false,
  enableFiltering = true,
  enableSorting = true,
  striped = "none",
  bordered = true,
  hoverable = true,
  stickyHeader = false,
  loading = false,
  loadingComponent,
  emptyMessage = "No results found.",
  emptyComponent,
  className,
  tableClassName,
  onRowClick,
  onSortingChange,
  onColumnFiltersChange,
  onColumnVisibilityChange,
  onRowSelectionChange,
  sorting: controlledSorting,
  columnFilters: controlledColumnFilters,
  columnVisibility: controlledColumnVisibility,
  rowSelection: controlledRowSelection,
  showPaginationInfo = true,
  showPageSize = true,
  pageSizeOptions = [10, 20, 30, 50, 100],
  enableGlobalFilter = false,
  globalFilterPlaceholder = "Search all columns...",
  onTableReady,
}: DataTableProps<TData, TValue>) => {
  // Validation
  const validator = new ComponentValidator("DataTable");
  validator.validateEnum("variant", variant, VALID_VARIANTS);
  validator.validateEnum("size", size, VALID_SIZES);
  validator.validateEnum("striped", striped, VALID_STRIPED);

  // Global filter state
  const [globalFilter, setGlobalFilter] = useState("");

  // Create table instance
  const table = useDataTable({
    data,
    columns,
    enableSorting,
    enableFiltering,
    enableRowSelection,
    enablePagination: pagination,
    pageSize,
    sorting: controlledSorting,
    columnFilters: controlledColumnFilters,
    columnVisibility: controlledColumnVisibility,
    rowSelection: controlledRowSelection,
    globalFilter: enableGlobalFilter ? globalFilter : undefined,
    onSortingChange,
    onColumnFiltersChange,
    onColumnVisibilityChange,
    onRowSelectionChange,
  });

  // Expose table instance
  useMemo(() => {
    if (onTableReady) {
      onTableReady(table);
    }
  }, [table, onTableReady]);

  // Pagination info
  const totalRows = table.getFilteredRowModel().rows.length;
  const pageIndex = table.getState().pagination.pageIndex;
  const currentPageSize = table.getState().pagination.pageSize;
  const startRow = totalRows === 0 ? 0 : pageIndex * currentPageSize + 1;
  const endRow = Math.min((pageIndex + 1) * currentPageSize, totalRows);
  const rowSelectionState = table.getState().rowSelection;

  return (
    <div className={cn(dataTableVariants({ variant }), "relative", className)}>
      {/* Global Filter */}
      {enableGlobalFilter && (
        <div className="p-4 border-b border-border/50">
          <input
            type="text"
            value={globalFilter ?? ""}
            onChange={(e) => {
              setGlobalFilter(e.target.value);
              table.setGlobalFilter(e.target.value);
            }}
            placeholder={globalFilterPlaceholder}
            className="w-full max-w-sm px-3 py-2 text-sm border border-border rounded-md bg-background transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          />
        </div>
      )}

      {/* Table */}
      <div className={cn(tableWrapperVariants(), tableClassName)}>
        {/* Loading Overlay */}
        {loading && (
          <div className={loadingOverlayVariants()}>
            {loadingComponent || (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm">Loading...</span>
              </div>
            )}
          </div>
        )}

        <table className="w-full border-collapse">
          {/* Header */}
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sortDirection = header.column.getIsSorted();
                  const canSort =
                    enableSorting &&
                    header.column.columnDef.enableSorting !== false;

                  return (
                    <th
                      key={header.id}
                      className={cn(
                        tableHeaderVariants({
                          variant,
                          size,
                          sticky: stickyHeader,
                        }),
                        bordered && "border-r border-border/30 last:border-r-0",
                        canSort &&
                          "cursor-pointer select-none hover:bg-muted/30",
                        header.column.columnDef.headerClassName
                      )}
                      onClick={
                        canSort
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                    >
                      {header.isPlaceholder ? null : (
                        <div className="flex items-center gap-2">
                          {typeof header.column.columnDef.header === "function"
                            ? header.column.columnDef.header({
                                column: header.column,
                              })
                            : header.column.columnDef.header}
                          {canSort && (
                            <span className="ml-auto">
                              {sortDirection === "asc" && (
                                <ArrowUp className="w-4 h-4" />
                              )}
                              {sortDirection === "desc" && (
                                <ArrowDown className="w-4 h-4" />
                              )}
                              {sortDirection === null && (
                                <ArrowUpDown className="w-4 h-4 opacity-50" />
                              )}
                            </span>
                          )}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          {/* Body */}
          <tbody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={cn(
                    tableRowVariants({
                      hoverable,
                      selected: row.getIsSelected(),
                      striped,
                    })
                  )}
                  onClick={() => onRowClick?.(row.original)}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    const cellValue = cell.getValue();

                    return (
                      <td
                        key={cell.id}
                        className={cn(
                          tableCellVariants({ size }),
                          bordered &&
                            "border-r border-border/30 last:border-r-0",
                          cell.column.columnDef.cellClassName
                        )}
                      >
                        {cell.column.columnDef.cell
                          ? typeof cell.column.columnDef.cell === "function"
                            ? cell.column.columnDef.cell({
                                row,
                                value: cellValue,
                                column: cell.column,
                              })
                            : cell.column.columnDef.cell
                          : cellValue}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className={cn(
                    tableCellVariants({ size }),
                    "text-center text-muted-foreground py-8"
                  )}
                >
                  {emptyComponent || emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalRows > 0 && (
        <div className={paginationContainerVariants({ variant })}>
          {/* Pagination Info */}
          {showPaginationInfo && (
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>
                Showing {startRow} to {endRow} of {totalRows} results
              </span>
              {enableRowSelection &&
                Object.keys(rowSelectionState).length > 0 && (
                  <span className="text-primary font-medium">
                    {Object.keys(rowSelectionState).length} selected
                  </span>
                )}
            </div>
          )}

          {/* Page Size Selector */}
          {showPageSize && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Rows per page:
              </span>
              <select
                value={currentPageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
                className="px-2 py-1 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {pageSizeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="p-1 rounded-md hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="First page"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-1 rounded-md hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-muted-foreground min-w-[100px] text-center">
              Page {pageIndex + 1} of {table.getPageCount()}
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-1 rounded-md hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="p-1 rounded-md hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Last page"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

DataTable.displayName = "DataTable";

/**
 * DataTableCompact Component
 *
 * Compact props-based API for DataTable with optional header.
 *
 * @example
 * ```tsx
 * <DataTableCompact
 *   title="Users"
 *   description="Manage your users"
 *   data={users}
 *   columns={columns}
 *   variant="primary"
 * />
 * ```
 */
export const DataTableCompact = <TData, TValue = unknown>({
  title,
  description,
  headerActions,
  ...props
}: import("./DataTable.types").DataTableCompactProps<TData, TValue>) => {
  return (
    <div className="space-y-4">
      {(title || description || headerActions) && (
        <div className="flex items-center justify-between">
          <div>
            {title && <h3 className="text-lg font-semibold">{title}</h3>}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          {headerActions && <div>{headerActions}</div>}
        </div>
      )}
      <DataTable {...props} />
    </div>
  );
};

DataTableCompact.displayName = "DataTableCompact";

/**
 * Table Component - For composition API
 */
export const Table = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableElement>) => {
  return (
    <table className={cn("w-full border-collapse", className)} {...props}>
      {children}
    </table>
  );
};

Table.displayName = "Table";

/**
 * TableHeader Component - For composition API
 */
export const TableHeader = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => {
  return (
    <thead className={className} {...props}>
      {children}
    </thead>
  );
};

TableHeader.displayName = "TableHeader";

/**
 * TableBody Component - For composition API
 */
export const TableBody = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => {
  return (
    <tbody className={className} {...props}>
      {children}
    </tbody>
  );
};

TableBody.displayName = "TableBody";

/**
 * TableRow Component - For composition API
 */
export const TableRow = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) => {
  return (
    <tr
      className={cn(
        "transition-colors duration-200 border-b border-border/50 hover:bg-muted/50",
        className
      )}
      {...props}
    >
      {children}
    </tr>
  );
};

TableRow.displayName = "TableRow";

/**
 * TableHead Component - For composition API
 */
export const TableHead = ({
  children,
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) => {
  return (
    <th
      className={cn(
        "px-4 py-3 text-left text-sm font-semibold text-foreground bg-muted/50 transition-colors duration-200",
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
};

TableHead.displayName = "TableHead";

/**
 * TableCell Component - For composition API
 */
export const TableCell = ({
  children,
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) => {
  return (
    <td
      className={cn(
        "px-4 py-3 text-sm text-foreground transition-colors duration-200",
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
};

TableCell.displayName = "TableCell";

/**
 * Helper function to render cell/header content
 */
export function flexRender<TProps>(
  content: React.ReactNode | ((props: TProps) => React.ReactNode),
  props: TProps
): React.ReactNode {
  if (typeof content === "function") {
    return content(props);
  }
  return content;
}

export type { DataTableProps, DataTableCompactProps } from "./DataTable.types";
