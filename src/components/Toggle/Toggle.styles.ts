import { cva } from "class-variance-authority";

// ============================================================================
// TOGGLE VARIANTS
// ============================================================================

export const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "rounded-md text-sm font-medium transition-all duration-200",
    "disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    "whitespace-nowrap select-none cursor-pointer",
    "aria-pressed:shadow-inner",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-transparent hover:bg-accent/10",
          "aria-pressed:bg-accent aria-pressed:text-accent-foreground",
          "focus-visible:ring-accent/50",
        ],
        primary: [
          "bg-transparent hover:bg-primary/10",
          "aria-pressed:bg-primary aria-pressed:text-primary-foreground",
          "focus-visible:ring-primary/50",
        ],
        secondary: [
          "bg-transparent hover:bg-secondary/10",
          "aria-pressed:bg-secondary aria-pressed:text-secondary-foreground",
          "focus-visible:ring-secondary/50",
        ],
        accent: [
          "bg-transparent hover:bg-accent/10",
          "aria-pressed:bg-accent aria-pressed:text-accent-foreground",
          "focus-visible:ring-accent/50",
        ],
        success: [
          "bg-transparent hover:bg-success/10",
          "aria-pressed:bg-success aria-pressed:text-white",
          "focus-visible:ring-success/50",
        ],
        warning: [
          "bg-transparent hover:bg-warning/10",
          "aria-pressed:bg-warning aria-pressed:text-white",
          "focus-visible:ring-warning/50",
        ],
        error: [
          "bg-transparent hover:bg-error/10",
          "aria-pressed:bg-error aria-pressed:text-white",
          "focus-visible:ring-error/50",
        ],
        info: [
          "bg-transparent hover:bg-info/10",
          "aria-pressed:bg-info aria-pressed:text-white",
          "focus-visible:ring-info/50",
        ],
        outline: [
          "border border-input bg-transparent hover:bg-accent/10",
          "aria-pressed:bg-accent aria-pressed:text-accent-foreground aria-pressed:border-accent",
          "focus-visible:ring-accent/50",
        ],
        ghost: [
          "bg-transparent hover:bg-accent/10",
          "aria-pressed:bg-accent/20",
          "focus-visible:ring-accent/50",
        ],
      },
      size: {
        xs: "h-7 px-1.5 min-w-7 text-[10px]",
        sm: "h-8 px-2 min-w-8 text-xs",
        default: "h-9 px-3 min-w-9",
        lg: "h-10 px-4 min-w-10",
        xl: "h-11 px-5 min-w-11 text-base",
        "2xl": "h-13 px-6 min-w-13 text-lg",
        "3xl": "h-16 px-7 min-w-16 text-xl",
        "4xl": "h-20 px-8 min-w-20 text-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ToggleVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "outline"
  | "ghost";

export type ToggleSize =
  | "xs"
  | "sm"
  | "default"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl";

// ============================================================================
// TOGGLE GROUP VARIANTS
// ============================================================================

export const toggleGroupVariants = cva("inline-flex items-center gap-1", {
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});
