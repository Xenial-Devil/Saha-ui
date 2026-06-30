"use client";

import React, { createContext, useContext } from "react";
import { cn } from "../../lib/utils";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import type {
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableFooterProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
  TableVariant,
  TableSize,
  TableDensity,
  TableClassNames,
} from "./Table.types";
// validation removed
import {
  tableContainerVariants,
  tableVariants,
  tableHeaderVariants,
  tableCellVariants,
  tableRowVariants,
} from "./Table.styles";

interface TableContextValue {
  variant: TableVariant;
  size: TableSize;
  density: TableDensity;
  striped: boolean;
  hoverable: boolean;
  classNames?: TableClassNames;
}

const TableContext = createContext<TableContextValue | undefined>(undefined);

const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("Table components must be used within a Table component");
  }
  return context;
};

export const Table = React.forwardRef<HTMLDivElement, TableProps>(
  (
    {
      variant = "default",
      size = "md",
      density = "normal",
      striped = false,
      hoverable = true,
      className,
      classNames,
      children,
    },
    ref
  ) => {
    // development-only validation removed

    return (
      <TableContext.Provider
        value={{
          variant,
          size,
          density,
          striped,
          hoverable,
          classNames,
        }}
      >
        <div
          ref={ref}
          className={cn(tableContainerVariants({ variant }), classNames?.root, className)}
        >
          <table className={cn(tableVariants({ size }), classNames?.table)}>{children}</table>
        </div>
      </TableContext.Provider>
    );
  }
);

Table.displayName = "Table";

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ sticky = false, className, classNames: propClassNames, children }, ref) => {
  const { size, classNames: ctxClassNames } = useTableContext();
  const classNames = propClassNames ?? ctxClassNames;

  // development-only validation removed

  return (
    <thead
      ref={ref}
      className={cn(tableHeaderVariants({ sticky, size }), classNames?.header, className)}
    >
      {children}
    </thead>
  );
});

TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  TableBodyProps
>(({ className, classNames: propClassNames, children }, ref) => {
  const { classNames: ctxClassNames } = useTableContext();
  const classNames = propClassNames ?? ctxClassNames;
  return (
    <tbody ref={ref} className={cn(classNames?.body, className)}>
      {children}
    </tbody>
  );
});

TableBody.displayName = "TableBody";

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  TableFooterProps
>(({ className, classNames: propClassNames, children }, ref) => {
  const { classNames: ctxClassNames } = useTableContext();
  const classNames = propClassNames ?? ctxClassNames;
  return (
    <tfoot
      ref={ref}
      className={cn(
        "border-t-2 border-border bg-muted/50 font-semibold",
        classNames?.footer,
        className
      )}
    >
      {children}
    </tfoot>
  );
});

TableFooter.displayName = "TableFooter";

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ selected = false, className, classNames: propClassNames, onClick, children }, ref) => {
    const { hoverable, striped, classNames: ctxClassNames } = useTableContext();
    const classNames = propClassNames ?? ctxClassNames;

    return (
      <tr
        ref={ref}
        className={cn(
          tableRowVariants({
            hoverable: hoverable || !!onClick,
            striped,
            selected,
          }),
          classNames?.row,
          className
        )}
        onClick={onClick}
      >
        {children}
      </tr>
    );
  }
);

TableRow.displayName = "TableRow";

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  (
    {
      align = "left",
      width,
      minWidth,
      maxWidth,
      sortable = false,
      sortDirection = null,
      onSort,
      className,
      classNames: propClassNames,
      children,
    },
    ref
  ) => {
    const { density, classNames: ctxClassNames } = useTableContext();
    const classNames = propClassNames ?? ctxClassNames;

    const renderSortIcon = () => {
      if (!sortDirection) {
        return <ArrowUpDown className="w-4 h-4 opacity-50" />;
      }
      return sortDirection === "asc" ? (
        <ArrowUp className="w-4 h-4" />
      ) : (
        <ArrowDown className="w-4 h-4" />
      );
    };

    return (
      <th
        ref={ref}
        className={cn(
          tableCellVariants({ density, align }),
          sortable && "cursor-pointer select-none",
          classNames?.head,
          className
        )}
        style={{
          width,
          minWidth,
          maxWidth,
        }}
        onClick={sortable ? onSort : undefined}
      >
        <div className="flex items-center gap-2">
          <span>{children}</span>
          {sortable && renderSortIcon()}
        </div>
      </th>
    );
  }
);

TableHead.displayName = "TableHead";

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ align = "left", width, minWidth, maxWidth, className, classNames: propClassNames, children }, ref) => {
    const { density, classNames: ctxClassNames } = useTableContext();
    const classNames = propClassNames ?? ctxClassNames;

    return (
      <td
        ref={ref}
        className={cn(tableCellVariants({ density, align }), classNames?.cell, className)}
        style={{
          width,
          minWidth,
          maxWidth,
        }}
      >
        {children}
      </td>
    );
  }
);

TableCell.displayName = "TableCell";
