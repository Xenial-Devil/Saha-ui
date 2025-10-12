import React, { createContext, useContext } from "react";
import { cva } from "class-variance-authority";
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
  },
  defaultVariants: {
    variant: "default",
  },
});

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
