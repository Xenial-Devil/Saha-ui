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

const tableContainerVariants = cva(
  "w-full overflow-auto rounded-lg transition-all duration-300 relative isolate hover:shadow-2xl",
  {
    variants: {
      variant: {
        default:
          "border border-border shadow-md hover:border-primary/30 before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:via-transparent before:to-accent/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 before:pointer-events-none",
        bordered:
          "border-2 border-border shadow-md hover:shadow-xl hover:border-primary/50 before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:via-transparent before:to-accent/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 before:pointer-events-none",
        striped: "border border-border shadow-md hover:border-primary/30",
        glass:
          "border border-border/30 bg-background/50 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:border-white/20 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 before:pointer-events-none",
        minimal: "hover:shadow-md",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

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
  "border-b border-border bg-muted/50 font-semibold text-muted-foreground uppercase tracking-wider relative isolate transition-all duration-300 before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/10 before:via-transparent before:to-accent/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
  {
    variants: {
      sticky: {
        true: "sticky top-0 z-10 bg-background shadow-md hover:shadow-lg backdrop-blur-sm",
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

const tableCellVariants = cva(
  "border-b border-border transition-all duration-300 relative isolate before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-primary/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
  {
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
  }
);

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
