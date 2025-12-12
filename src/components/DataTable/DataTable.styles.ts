import { cva, type VariantProps } from "class-variance-authority";

/**
 * DataTable container styles with variants
 */
export const dataTableVariants = cva(
  [
    // Base styles
    "w-full",
    "rounded-lg",
    "overflow-hidden",
    "transition-all",
    "duration-300",
  ],
  {
    variants: {
      variant: {
        default: ["bg-background", "border", "border-border", "shadow-sm"],
        primary: [
          "bg-gradient-to-br",
          "from-primary/5",
          "to-primary/10",
          "border",
          "border-primary/20",
          "shadow-md",
          "shadow-primary/10",
        ],
        secondary: [
          "bg-gradient-to-br",
          "from-secondary/5",
          "to-secondary/10",
          "border",
          "border-secondary/20",
          "shadow-md",
          "shadow-secondary/10",
        ],
        accent: [
          "bg-gradient-to-br",
          "from-accent/5",
          "to-accent/10",
          "border",
          "border-accent/20",
          "shadow-md",
          "shadow-accent/10",
        ],
        success: [
          "bg-gradient-to-br",
          "from-success/5",
          "to-success/10",
          "border",
          "border-success/20",
          "shadow-md",
          "shadow-success/10",
        ],
        warning: [
          "bg-gradient-to-br",
          "from-warning/5",
          "to-warning/10",
          "border",
          "border-warning/20",
          "shadow-md",
          "shadow-warning/10",
        ],
        error: [
          "bg-gradient-to-br",
          "from-error/5",
          "to-error/10",
          "border",
          "border-error/20",
          "shadow-md",
          "shadow-error/10",
        ],
        info: [
          "bg-gradient-to-br",
          "from-info/5",
          "to-info/10",
          "border",
          "border-info/20",
          "shadow-md",
          "shadow-info/10",
        ],
        outline: ["bg-background", "border-2", "border-border", "shadow-sm"],
        glass: [
          "bg-white/10",
          "dark:bg-gray-900/10",
          "backdrop-blur-xl",
          "border",
          "border-white/20",
          "dark:border-gray-700/30",
          "shadow-xl",
          "shadow-black/5",
          "dark:shadow-black/20",
          "before:absolute",
          "before:inset-0",
          "before:bg-gradient-to-br",
          "before:from-white/20",
          "before:to-transparent",
          "before:rounded-lg",
          "before:pointer-events-none",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Table wrapper styles
 */
export const tableWrapperVariants = cva([
  "relative",
  "overflow-auto",
  "transition-all",
  "duration-300",
]);

/**
 * Table header styles
 */
export const tableHeaderVariants = cva(
  ["transition-colors", "duration-200", "font-semibold", "text-left"],
  {
    variants: {
      variant: {
        default: ["bg-muted/50", "text-foreground"],
        primary: [
          "bg-primary/10",
          "text-primary-foreground",
          "dark:text-primary",
        ],
        secondary: [
          "bg-secondary/10",
          "text-secondary-foreground",
          "dark:text-secondary",
        ],
        accent: ["bg-accent/10", "text-accent-foreground", "dark:text-accent"],
        success: [
          "bg-success/10",
          "text-success-foreground",
          "dark:text-success",
        ],
        warning: [
          "bg-warning/10",
          "text-warning-foreground",
          "dark:text-warning",
        ],
        error: ["bg-error/10", "text-error-foreground", "dark:text-error"],
        info: ["bg-info/10", "text-info-foreground", "dark:text-info"],
        outline: [
          "bg-background",
          "text-foreground",
          "border-b-2",
          "border-border",
        ],
        glass: [
          "bg-white/5",
          "dark:bg-gray-900/5",
          "backdrop-blur-sm",
          "text-foreground",
        ],
      },
      size: {
        xs: "px-1.5 py-1.5 text-[10px]",
        sm: "px-2 py-2 text-xs",
        md: "px-4 py-3 text-sm",
        lg: "px-6 py-4 text-base",
        xl: "px-8 py-5 text-lg",
        "2xl": "px-10 py-6 text-xl",
        "3xl": "px-12 py-7 text-2xl",
        "4xl": "px-14 py-8 text-3xl",
      },
      sticky: {
        true: "sticky top-0 z-10 shadow-sm",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      sticky: false,
    },
  }
);

/**
 * Table row styles
 */
export const tableRowVariants = cva(
  ["transition-colors", "duration-200", "border-b", "border-border/50"],
  {
    variants: {
      hoverable: {
        true: "hover:bg-muted/50 cursor-pointer",
        false: "",
      },
      selected: {
        true: "bg-primary/10",
        false: "",
      },
      striped: {
        none: "",
        odd: "odd:bg-muted/20",
        even: "even:bg-muted/20",
      },
    },
    defaultVariants: {
      hoverable: true,
      selected: false,
      striped: "none",
    },
  }
);

/**
 * Table cell styles
 */
export const tableCellVariants = cva(["transition-colors", "duration-200"], {
  variants: {
    size: {
      xs: "px-1.5 py-1.5 text-[10px]",
      sm: "px-2 py-2 text-xs",
      md: "px-4 py-3 text-sm",
      lg: "px-6 py-4 text-base",
      xl: "px-8 py-5 text-lg",
      "2xl": "px-10 py-6 text-xl",
      "3xl": "px-12 py-7 text-2xl",
      "4xl": "px-14 py-8 text-3xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

/**
 * Pagination container styles
 */
export const paginationContainerVariants = cva(
  [
    "flex",
    "items-center",
    "justify-between",
    "gap-4",
    "px-4",
    "py-3",
    "border-t",
    "border-border/50",
    "bg-muted/20",
    "transition-colors",
    "duration-200",
  ],
  {
    variants: {
      variant: {
        default: "",
        primary: "bg-primary/5",
        secondary: "bg-secondary/5",
        accent: "bg-accent/5",
        success: "bg-success/5",
        warning: "bg-warning/5",
        error: "bg-error/5",
        info: "bg-info/5",
        outline: "",
        glass: "bg-white/5 dark:bg-gray-900/5 backdrop-blur-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Filter input styles
 */
export const filterInputVariants = cva([
  "flex-1",
  "max-w-sm",
  "px-3",
  "py-2",
  "text-sm",
  "border",
  "border-border",
  "rounded-md",
  "bg-background",
  "transition-all",
  "duration-200",
  "focus:outline-none",
  "focus:ring-2",
  "focus:ring-primary/50",
  "focus:border-primary",
]);

/**
 * Loading overlay styles
 */
export const loadingOverlayVariants = cva([
  "absolute",
  "inset-0",
  "bg-background/80",
  "backdrop-blur-sm",
  "flex",
  "items-center",
  "justify-center",
  "z-20",
  "transition-opacity",
  "duration-300",
]);

export type DataTableVariantsProps = VariantProps<typeof dataTableVariants>;
export type TableHeaderVariantsProps = VariantProps<typeof tableHeaderVariants>;
export type TableRowVariantsProps = VariantProps<typeof tableRowVariants>;
export type TableCellVariantsProps = VariantProps<typeof tableCellVariants>;
export type PaginationContainerVariantsProps = VariantProps<
  typeof paginationContainerVariants
>;
