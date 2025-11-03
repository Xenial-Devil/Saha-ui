import { useState, useMemo, useCallback } from "react";
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  RowSelectionState,
  PaginationState,
  TableInstance,
  Row,
  Column,
  Cell,
  HeaderGroup,
  Header,
  SortDirection,
} from "../components/DataTable/DataTable.types";

interface UseDataTableOptions<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enableRowSelection?: boolean;
  enablePagination?: boolean;
  pageSize?: number;
  sorting?: SortingState[];
  columnFilters?: ColumnFiltersState;
  columnVisibility?: VisibilityState;
  rowSelection?: RowSelectionState;
  globalFilter?: string;
  onSortingChange?: (sorting: SortingState[]) => void;
  onColumnFiltersChange?: (filters: ColumnFiltersState) => void;
  onColumnVisibilityChange?: (visibility: VisibilityState) => void;
  onRowSelectionChange?: (selection: RowSelectionState) => void;
}

export function useDataTable<TData>({
  data,
  columns,
  enableSorting = true,
  enableFiltering = true,
  enablePagination = true,
  pageSize: initialPageSize = 10,
  sorting: controlledSorting,
  columnFilters: controlledColumnFilters,
  columnVisibility: controlledColumnVisibility,
  rowSelection: controlledRowSelection,
  globalFilter: controlledGlobalFilter,
  onSortingChange,
  onColumnFiltersChange,
  onColumnVisibilityChange,
  onRowSelectionChange,
}: UseDataTableOptions<TData>): TableInstance<TData> {
  // Internal state
  const [internalSorting, setInternalSorting] = useState<SortingState[]>([]);
  const [internalColumnFilters, setInternalColumnFilters] =
    useState<ColumnFiltersState>([]);
  const [internalColumnVisibility, setInternalColumnVisibility] =
    useState<VisibilityState>({});
  const [internalRowSelection, setInternalRowSelection] =
    useState<RowSelectionState>({});
  const [internalGlobalFilter, setInternalGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  });

  // Use controlled or internal state
  const sorting = controlledSorting ?? internalSorting;
  const columnFilters = controlledColumnFilters ?? internalColumnFilters;
  const columnVisibility =
    controlledColumnVisibility ?? internalColumnVisibility;
  const rowSelection = controlledRowSelection ?? internalRowSelection;
  const globalFilter = controlledGlobalFilter ?? internalGlobalFilter;

  // Handlers
  const setSorting = useCallback(
    (newSorting: SortingState[]) => {
      if (onSortingChange) {
        onSortingChange(newSorting);
      } else {
        setInternalSorting(newSorting);
      }
    },
    [onSortingChange]
  );

  const setColumnFilters = useCallback(
    (newFilters: ColumnFiltersState) => {
      if (onColumnFiltersChange) {
        onColumnFiltersChange(newFilters);
      } else {
        setInternalColumnFilters(newFilters);
      }
    },
    [onColumnFiltersChange]
  );

  const setColumnVisibility = useCallback(
    (newVisibility: VisibilityState) => {
      if (onColumnVisibilityChange) {
        onColumnVisibilityChange(newVisibility);
      } else {
        setInternalColumnVisibility(newVisibility);
      }
    },
    [onColumnVisibilityChange]
  );

  const setRowSelection = useCallback(
    (newSelection: RowSelectionState) => {
      if (onRowSelectionChange) {
        onRowSelectionChange(newSelection);
      } else {
        setInternalRowSelection(newSelection);
      }
    },
    [onRowSelectionChange]
  );

  const setGlobalFilter = useCallback((filter: string) => {
    setInternalGlobalFilter(filter);
  }, []);

  // Create column instances
  const columnInstances = useMemo<Column<TData>[]>(() => {
    return columns.map((columnDef, index) => {
      const id =
        columnDef.id || columnDef.accessorKey?.toString() || `column-${index}`;

      return {
        id,
        columnDef,
        getIsSorted: (): SortDirection => {
          const sortItem = sorting.find((s) => s.id === id);
          if (!sortItem) return null;
          return sortItem.desc ? "desc" : "asc";
        },
        getToggleSortingHandler: () => () => {
          if (!enableSorting || columnDef.enableSorting === false) return;

          const existingSort = sorting.find((s) => s.id === id);
          let newSorting: SortingState[];

          if (!existingSort) {
            newSorting = [{ id, desc: false }];
          } else if (!existingSort.desc) {
            newSorting = [{ id, desc: true }];
          } else {
            newSorting = [];
          }

          setSorting(newSorting);
        },
        getIsVisible: () => columnVisibility[id] !== false,
        toggleVisibility: (value?: boolean) => {
          setColumnVisibility({
            ...columnVisibility,
            [id]: value ?? !columnVisibility[id],
          });
        },
      };
    });
  }, [
    columns,
    sorting,
    columnVisibility,
    enableSorting,
    setSorting,
    setColumnVisibility,
  ]);

  // Filter rows
  const filteredRows = useMemo(() => {
    if (!enableFiltering && !globalFilter) return data;

    return data.filter((row, rowIndex) => {
      // Global filter
      if (globalFilter) {
        const searchValue = globalFilter.toLowerCase();
        const matchesGlobal = columnInstances.some((col) => {
          const value = col.columnDef.accessorKey
            ? row[col.columnDef.accessorKey]
            : col.columnDef.accessorFn?.(row);
          return String(value).toLowerCase().includes(searchValue);
        });

        if (!matchesGlobal) return false;
      }

      // Column filters
      if (enableFiltering) {
        for (const filter of columnFilters) {
          const column = columnInstances.find((c) => c.id === filter.id);
          if (!column) continue;

          if (column.columnDef.filterFn) {
            const mockRow: Row<TData> = {
              id: `${rowIndex}`,
              index: rowIndex,
              original: row,
              getValue: (columnId: string) => {
                const col = columnInstances.find((c) => c.id === columnId);
                if (!col) return undefined;
                return col.columnDef.accessorKey
                  ? row[col.columnDef.accessorKey]
                  : col.columnDef.accessorFn?.(row);
              },
              getIsSelected: () => rowSelection[`${rowIndex}`] || false,
              toggleSelected: () => {},
              getVisibleCells: () => [],
            };

            if (!column.columnDef.filterFn(mockRow, filter.id, filter.value)) {
              return false;
            }
          } else {
            const value = column.columnDef.accessorKey
              ? row[column.columnDef.accessorKey]
              : column.columnDef.accessorFn?.(row);

            if (
              !String(value)
                .toLowerCase()
                .includes(String(filter.value).toLowerCase())
            ) {
              return false;
            }
          }
        }
      }

      return true;
    });
  }, [
    data,
    columnFilters,
    columnInstances,
    enableFiltering,
    globalFilter,
    rowSelection,
  ]);

  // Sort rows
  const sortedRows = useMemo(() => {
    if (!enableSorting || sorting.length === 0) return filteredRows;

    return [...filteredRows].sort((a, b) => {
      for (const sortItem of sorting) {
        const column = columnInstances.find((c) => c.id === sortItem.id);
        if (!column) continue;

        const aValue = column.columnDef.accessorKey
          ? a[column.columnDef.accessorKey]
          : column.columnDef.accessorFn?.(a);
        const bValue = column.columnDef.accessorKey
          ? b[column.columnDef.accessorKey]
          : column.columnDef.accessorFn?.(b);

        let comparison = 0;

        if (aValue < bValue) comparison = -1;
        if (aValue > bValue) comparison = 1;

        if (comparison !== 0) {
          return sortItem.desc ? -comparison : comparison;
        }
      }

      return 0;
    });
  }, [filteredRows, sorting, columnInstances, enableSorting]);

  // Create row instances
  const rows = useMemo<Row<TData>[]>(() => {
    return sortedRows.map((original, index) => {
      const rowId = `${index}`;

      const row: Row<TData> = {
        id: rowId,
        index,
        original,
        getValue: (columnId: string) => {
          const column = columnInstances.find((c) => c.id === columnId);
          if (!column) return undefined;
          return column.columnDef.accessorKey
            ? original[column.columnDef.accessorKey]
            : column.columnDef.accessorFn?.(original);
        },
        getIsSelected: () => rowSelection[rowId] || false,
        toggleSelected: (value?: boolean) => {
          setRowSelection({
            ...rowSelection,
            [rowId]: value ?? !rowSelection[rowId],
          });
        },
        getVisibleCells: () => {
          return columnInstances
            .filter((col) => col.getIsVisible())
            .map(
              (col): Cell<TData> => ({
                id: `${rowId}-${col.id}`,
                column: col,
                row,
                getValue: () => {
                  return col.columnDef.accessorKey
                    ? original[col.columnDef.accessorKey]
                    : col.columnDef.accessorFn?.(original);
                },
              })
            );
        },
      };

      return row;
    });
  }, [sortedRows, columnInstances, rowSelection, setRowSelection]);

  // Paginate rows
  const paginatedRows = useMemo(() => {
    if (!enablePagination) return rows;

    const start = pagination.pageIndex * pagination.pageSize;
    const end = start + pagination.pageSize;
    return rows.slice(start, end);
  }, [rows, pagination, enablePagination]);

  // Header groups
  const headerGroups = useMemo<HeaderGroup<TData>[]>(() => {
    const headers: Header<TData>[] = columnInstances
      .filter((col) => col.getIsVisible())
      .map((col) => ({
        id: col.id,
        column: col,
        isPlaceholder: false,
        colSpan: 1,
      }));

    return [
      {
        id: "header-group-0",
        headers,
      },
    ];
  }, [columnInstances]);

  // Table instance
  const table: TableInstance<TData> = {
    getRowModel: () => ({ rows: paginatedRows }),
    getFilteredRowModel: () => ({ rows: rows }),
    getHeaderGroups: () => headerGroups,
    getState: () => ({
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
      globalFilter,
    }),
    setPageIndex: (pageIndex: number) => {
      setPagination((prev) => ({ ...prev, pageIndex }));
    },
    setPageSize: (pageSize: number) => {
      setPagination((prev) => ({ ...prev, pageSize, pageIndex: 0 }));
    },
    nextPage: () => {
      setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex + 1 }));
    },
    previousPage: () => {
      setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex - 1 }));
    },
    getCanNextPage: () => {
      return (
        pagination.pageIndex < Math.ceil(rows.length / pagination.pageSize) - 1
      );
    },
    getCanPreviousPage: () => {
      return pagination.pageIndex > 0;
    },
    getPageCount: () => {
      return Math.ceil(rows.length / pagination.pageSize);
    },
    setGlobalFilter,
    setSorting,
    setColumnFilters,
    setColumnVisibility,
    setRowSelection,
  };

  return table;
}
