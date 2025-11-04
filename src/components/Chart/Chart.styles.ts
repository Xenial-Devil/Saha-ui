import { cva } from "class-variance-authority";
import type { ChartVariant, ChartSize } from "./Chart.types";

/**
 * Chart container variants
 */
export const chartVariants = cva(
  [
    "relative w-full",
    "rounded-lg",
    "transition-all duration-300",
    "overflow-hidden",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-card text-card-foreground border border-border shadow-sm hover:shadow-md",
        primary:
          "bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 shadow-lg shadow-primary/10",
        secondary:
          "bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 shadow-lg shadow-secondary/10",
        accent:
          "bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 shadow-lg shadow-accent/10",
        success:
          "bg-gradient-to-br from-success/10 to-success/5 border border-success/20 shadow-lg shadow-success/10",
        warning:
          "bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20 shadow-lg shadow-warning/10",
        error:
          "bg-gradient-to-br from-destructive/10 to-destructive/5 border border-destructive/20 shadow-lg shadow-destructive/10",
        info: "bg-gradient-to-br from-info/10 to-info/5 border border-info/20 shadow-lg shadow-info/10",
        outline: "border-2 border-border bg-transparent",
        ghost: "bg-transparent hover:bg-accent/5",
        glass:
          "backdrop-blur-md bg-background/80 border border-border/50 shadow-xl",
      } satisfies Record<ChartVariant, string>,
      size: {
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
        xl: "p-8",
      } satisfies Record<ChartSize, string>,
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

/**
 * Chart title variants
 */
export const chartTitleVariants = cva(
  ["font-semibold tracking-tight transition-colors"],
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
      } satisfies Record<ChartSize, string>,
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/**
 * Chart description variants
 */
export const chartDescriptionVariants = cva(
  ["text-muted-foreground mt-1 transition-colors"],
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-sm",
        xl: "text-base",
      } satisfies Record<ChartSize, string>,
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/**
 * Chart canvas variants
 */
export const chartCanvasVariants = cva(["relative w-full"], {
  variants: {
    size: {
      sm: "h-[200px]",
      md: "h-[300px]",
      lg: "h-[400px]",
      xl: "h-[500px]",
    } satisfies Record<ChartSize, string>,
  },
  defaultVariants: {
    size: "md",
  },
});

/**
 * Legend variants
 */
export const legendVariants = cva(
  [
    "flex flex-wrap gap-4 mt-4 pt-4 border-t border-border",
    "transition-all duration-300",
  ],
  {
    variants: {
      position: {
        top: "order-first mt-0 mb-4 pt-0 pb-4 border-t-0 border-b",
        bottom: "order-last",
        left: "flex-col items-start mt-0 ml-0 mr-4 pt-0 pl-0 pr-4 border-t-0 border-r",
        right:
          "flex-col items-start mt-0 mr-0 ml-4 pt-0 pr-0 pl-4 border-t-0 border-l",
      },
    },
    defaultVariants: {
      position: "bottom",
    },
  }
);

/**
 * Legend item variants
 */
export const legendItemVariants = cva(
  [
    "inline-flex items-center gap-2",
    "text-sm font-medium",
    "cursor-pointer select-none",
    "transition-all duration-200",
    "hover:opacity-80",
  ],
  {
    variants: {
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

/**
 * Tooltip variants
 */
export const tooltipVariants = cva(
  [
    "absolute z-50",
    "rounded-lg border bg-popover px-3 py-2",
    "text-sm text-popover-foreground",
    "shadow-lg",
    "pointer-events-none",
    "transition-opacity duration-200",
  ],
  {
    variants: {
      visible: {
        true: "opacity-100",
        false: "opacity-0",
      },
    },
    defaultVariants: {
      visible: false,
    },
  }
);
