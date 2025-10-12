import React, { useState, useMemo } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { TableProps, SortDirection } from "./Table.types";
import { ArrowUp, ArrowDown, ArrowUpDown, Loader2 } from "lucide-react";

/**
 * CVA variants for Table container
 */
const tableContainerVariants = cva("w-full overflow-auto rounded-lg", {
  variants: {
    variant: {
      default: "border border-border",
      bordered: "border-2 border-border shadow-sm",
      striped: "border border-border",
      glass:
        "border border-border/30 bg-background/50 backdrop-blur-sm shadow-lg",
      minimal: "",
    },
    responsive: {
      true: "overflow-x-auto",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    responsive: true,
  },
});

/**
 * CVA variants for Table element
 */
const tableVariants = cva("w-full border-collapse text-left", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

/**
 * CVA variants for table header
 */
const tableHeaderVariants = cva(
  "border-b border-border bg-muted/50 font-semibold text-muted-foreground uppercase tracking-wider",
  {
    variants: {
      sticky: {
        true: "sticky top-0 z-10 bg-background shadow-sm",
        false: "",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      sticky: false,
      size: "md",
    },
  }
);

/**
 * CVA variants for table cells
 */
const tableCellVariants = cva("border-b border-border transition-colors", {
  variants: {
    density: {
      compact: "px-3 py-2",
      normal: "px-4 py-3",
      comfortable: "px-6 py-4",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    density: "normal",
    align: "left",
  },
});

/**
 * CVA variants for table rows
 */
const tableRowVariants = cva("transition-colors", {
  variants: {
    hoverable: {
      true: "hover:bg-muted/50 cursor-pointer",
      false: "",
    },
    striped: {
      true: "even:bg-muted/30",
      false: "",
    },
    selected: {
      true: "bg-primary/10 hover:bg-primary/20",
      false: "",
    },
  },
  defaultVariants: {
    hoverable: true,
    striped: false,
    selected: false,
  },
});

/**
 * Ultra-modern Table component
 *
 * Feature-rich data table with sorting, selection, responsive design,
 * and multiple variants. Perfect for displaying tabular data.
 *
 * @example
 * ```tsx
 * <Table
 *   columns={[
 *     { id: 'name', header: 'Name', accessor: 'name' },
 *     { id: 'age', header: 'Age', accessor: 'age', align: 'right' },
 *   ]}
 *   data={users}
 *   variant="glass"
 *   sortable
 * />
 * ```
 */
const Table = React.forwardRef<HTMLDivElement, TableProps>(
  (
    {
      columns,
      data,
      variant = "default",
      size = "md",
      density = "normal",
      bordered = false,
      hoverable = true,
      striped = false,
      showHeader = true,
      showFooter = false,
      selectable = false,
      selectedRows = [],
      onRowSelect,
      rowKey = "id",
      sortable = false,
      sortBy,
      onSort,
      loading = false,
      emptyMessage = "No data available",
      caption,
      responsive = true,
      stickyHeader = false,
      maxHeight,
      rowClassName,
      onRowClick,
      loadingOverlay = false,
      className,
      ...props
    },
    ref
  ) => {
    const [internalSort, setInternalSort] = useState<{
      column: string;
      direction: SortDirection;
    }>({ column: "", direction: null });

    const currentSort = sortBy || internalSort;

    // Get row key
    const getRowKey = (row: any, index: number): string | number => {
      if (typeof rowKey === "function") {
        return rowKey(row);
      }
      return row[rowKey] ?? index;
    };

    // Handle sort
    const handleSort = (columnId: string) => {
      if (!sortable) return;

      const column = columns.find((col) => col.id === columnId);
      if (!column?.sortable && !sortable) return;

      let newDirection: SortDirection = "asc";
      if (currentSort.column === columnId) {
        newDirection = currentSort.direction === "asc" ? "desc" : null;
      }

      const newSort = { column: columnId, direction: newDirection };

      if (onSort) {
        onSort(columnId, newDirection);
      } else {
        setInternalSort(newSort);
      }
    };

    // Handle row selection
    const handleRowSelect = (rowKey: string | number) => {
      if (!selectable || !onRowSelect) return;

      const newSelected = selectedRows.includes(rowKey)
        ? selectedRows.filter((key) => key !== rowKey)
        : [...selectedRows, rowKey];

      onRowSelect(newSelected);
    };

    // Handle select all
    const handleSelectAll = () => {
      if (!selectable || !onRowSelect) return;

      if (selectedRows.length === data.length) {
        onRowSelect([]);
      } else {
        onRowSelect(data.map((row, index) => getRowKey(row, index)));
      }
    };

    // Sort data
    const sortedData = useMemo(() => {
      if (!currentSort.direction || !currentSort.column) return data;

      const column = columns.find((col) => col.id === currentSort.column);
      if (!column) return data;

      return [...data].sort((a, b) => {
        if (column.sortFn) {
          return column.sortFn(a, b, currentSort.direction as "asc" | "desc");
        }

        let aVal: any;
        let bVal: any;

        if (typeof column.accessor === "function") {
          aVal = column.accessor(a);
          bVal = column.accessor(b);
        } else if (column.accessor) {
          aVal = a[column.accessor];
          bVal = b[column.accessor];
        }

        if (aVal === bVal) return 0;

        const comparison = aVal > bVal ? 1 : -1;
        return currentSort.direction === "asc" ? comparison : -comparison;
      });
    }, [data, currentSort, columns]);

    // Get cell value
    const getCellValue = (row: any, column: any) => {
      if (column.cell) {
        return column.cell(row, data.indexOf(row));
      }

      if (typeof column.accessor === "function") {
        return column.accessor(row);
      }

      if (column.accessor) {
        return row[column.accessor];
      }

      return null;
    };

    // Render sort icon
    const renderSortIcon = (columnId: string) => {
      if (currentSort.column !== columnId) {
        return <ArrowUpDown className="w-4 h-4 opacity-50" />;
      }
      return currentSort.direction === "asc" ? (
        <ArrowUp className="w-4 h-4" />
      ) : (
        <ArrowDown className="w-4 h-4" />
      );
    };

    return (
      <div
        ref={ref}
        className={cn(
          tableContainerVariants({ variant, responsive }),
          maxHeight && "overflow-y-auto",
          className
        )}
        style={{ maxHeight }}
        {...props}
      >
        {caption && (
          <div className="px-4 py-2 text-sm text-muted-foreground border-b border-border">
            {caption}
          </div>
        )}

        {/* Loading Overlay */}
        {loadingOverlay && loading && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        <table className={cn(tableVariants({ size }), "relative")}>
          {/* Header */}
          {showHeader && (
            <thead
              className={cn(
                tableHeaderVariants({ sticky: stickyHeader, size })
              )}
            >
              <tr>
                {/* Selection Column */}
                {selectable && (
                  <th className={cn(tableCellVariants({ density }), "w-12")}>
                    <input
                      type="checkbox"
                      checked={
                        selectedRows.length === data.length && data.length > 0
                      }
                      onChange={handleSelectAll}
                      className="cursor-pointer accent-primary"
                      aria-label="Select all rows"
                    />
                  </th>
                )}

                {/* Column Headers */}
                {columns.map((column) => (
                  <th
                    key={column.id}
                    className={cn(
                      tableCellVariants({ density, align: column.align }),
                      (sortable || column.sortable) &&
                        "cursor-pointer select-none",
                      column.headerClassName
                    )}
                    style={{
                      width: column.width,
                      minWidth: column.minWidth,
                      maxWidth: column.maxWidth,
                    }}
                    onClick={() =>
                      (sortable || column.sortable) && handleSort(column.id)
                    }
                  >
                    <div className="flex items-center gap-2">
                      <span>{column.header}</span>
                      {(sortable || column.sortable) &&
                        renderSortIcon(column.id)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
          )}

          {/* Body */}
          <tbody>
            {loading && !loadingOverlay ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className={cn(tableCellVariants({ density }), "text-center")}
                >
                  <div className="flex items-center justify-center gap-2 py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    <span className="text-muted-foreground">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className={cn(tableCellVariants({ density }), "text-center")}
                >
                  <div className="py-8 text-muted-foreground">
                    {emptyMessage}
                  </div>
                </td>
              </tr>
            ) : (
              sortedData.map((row, rowIndex) => {
                const key = getRowKey(row, rowIndex);
                const isSelected = selectedRows.includes(key);
                const rowClass =
                  typeof rowClassName === "function"
                    ? rowClassName(row, rowIndex)
                    : rowClassName;

                return (
                  <tr
                    key={key}
                    className={cn(
                      tableRowVariants({
                        hoverable: hoverable || !!onRowClick,
                        striped,
                        selected: isSelected,
                      }),
                      rowClass
                    )}
                    onClick={() => onRowClick?.(row, rowIndex)}
                  >
                    {/* Selection Cell */}
                    {selectable && (
                      <td className={cn(tableCellVariants({ density }))}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleRowSelect(key)}
                          onClick={(e) => e.stopPropagation()}
                          className="cursor-pointer accent-primary"
                          aria-label={`Select row ${rowIndex + 1}`}
                        />
                      </td>
                    )}

                    {/* Data Cells */}
                    {columns.map((column) => (
                      <td
                        key={column.id}
                        className={cn(
                          tableCellVariants({ density, align: column.align }),
                          column.cellClassName
                        )}
                        style={{
                          width: column.width,
                          minWidth: column.minWidth,
                          maxWidth: column.maxWidth,
                        }}
                      >
                        {getCellValue(row, column)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>

          {/* Footer */}
          {showFooter && (
            <tfoot className="border-t-2 border-border bg-muted/50 font-semibold">
              <tr>
                {selectable && (
                  <td className={cn(tableCellVariants({ density }))} />
                )}
                {columns.map((column) => (
                  <td
                    key={column.id}
                    className={cn(
                      tableCellVariants({ density, align: column.align }),
                      column.footerClassName
                    )}
                  >
                    {column.footer}
                  </td>
                ))}
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    );
  }
);

Table.displayName = "Table";

export default Table;
