"use client";

import React, { createContext, useContext, useEffect } from "react";
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
} from "./Table.types";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
} from "../../lib/validation";
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
      children,
    },
    ref
  ) => {
    // Development-only validation
    useEffect(() => {
      const validator = createValidator("Table");

      // Validate variant
      validator.validateEnum("variant", variant, [
        "default",
        "bordered",
        "striped",
        "glass",
        "minimal",
      ] as const);

      // Validate size
      validator.validateEnum("size", size, ["sm", "md", "lg"] as const);

      // Validate density
      validator.validateEnum("density", density, [
        "compact",
        "normal",
        "comfortable",
      ] as const);

      // Validate boolean props
      validator.validateType("striped", striped, "boolean", isValidBoolean);
      validator.validateType("hoverable", hoverable, "boolean", isValidBoolean);

      // Common validators
      commonValidators.className(validator, className);
    }, [variant, size, density, striped, hoverable, className]);

    return (
      <TableContext.Provider
        value={{
          variant,
          size,
          density,
          striped,
          hoverable,
        }}
      >
        <div
          ref={ref}
          className={cn(tableContainerVariants({ variant }), className)}
        >
          <table className={cn(tableVariants({ size }))}>{children}</table>
        </div>
      </TableContext.Provider>
    );
  }
);

Table.displayName = "Table";

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ sticky = false, className, children }, ref) => {
  const { size } = useTableContext();

  // Development-only validation
  useEffect(() => {
    const validator = createValidator("TableHeader");

    // Validate boolean props
    validator.validateType("sticky", sticky, "boolean", isValidBoolean);

    // Common validators
    commonValidators.className(validator, className);
  }, [sticky, className]);

  return (
    <thead
      ref={ref}
      className={cn(tableHeaderVariants({ sticky, size }), className)}
    >
      {children}
    </thead>
  );
});

TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  TableBodyProps
>(({ className, children }, ref) => {
  return (
    <tbody ref={ref} className={cn(className)}>
      {children}
    </tbody>
  );
});

TableBody.displayName = "TableBody";

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  TableFooterProps
>(({ className, children }, ref) => {
  return (
    <tfoot
      ref={ref}
      className={cn(
        "border-t-2 border-border bg-muted/50 font-semibold",
        className
      )}
    >
      {children}
    </tfoot>
  );
});

TableFooter.displayName = "TableFooter";

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ selected = false, className, onClick, children }, ref) => {
    const { hoverable, striped } = useTableContext();

    return (
      <tr
        ref={ref}
        className={cn(
          tableRowVariants({
            hoverable: hoverable || !!onClick,
            striped,
            selected,
          }),
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
      children,
    },
    ref
  ) => {
    const { density } = useTableContext();

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
  ({ align = "left", width, minWidth, maxWidth, className, children }, ref) => {
    const { density } = useTableContext();

    return (
      <td
        ref={ref}
        className={cn(tableCellVariants({ density, align }), className)}
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
