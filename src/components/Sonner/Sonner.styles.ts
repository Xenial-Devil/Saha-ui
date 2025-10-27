import { cva } from "class-variance-authority";
import type { SonnerPosition, SonnerVariant, SonnerType } from "./index";

// ============================================================================
// SONNER CONTAINER
// ============================================================================

export const sonnerContainerVariants = cva(
  "fixed z-[100] flex flex-col gap-2 p-4 pointer-events-none",
  {
    variants: {
      position: {
        "top-left": "top-0 left-0 items-start",
        "top-center": "top-0 left-1/2 -translate-x-1/2 items-center",
        "top-right": "top-0 right-0 items-end",
        "bottom-left": "bottom-0 left-0 items-start",
        "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 items-center",
        "bottom-right": "bottom-0 right-0 items-end",
      } satisfies Record<SonnerPosition, string>,
    },
    defaultVariants: {
      position: "bottom-right",
    },
  }
);

// ============================================================================
// SONNER TOAST
// ============================================================================

export const sonnerToastVariants = cva(
  [
    "group relative flex w-full max-w-md items-center justify-between gap-3 overflow-hidden rounded-lg border p-4 shadow-lg backdrop-blur-sm pointer-events-auto",
    "transition-all duration-200 ease-out",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-border/50 bg-background/95 text-foreground",
          "shadow-md shadow-black/5",
        ],
        primary: [
          "border-primary/50 bg-primary/10 text-primary",
          "shadow-md shadow-primary/20",
        ],
        secondary: [
          "border-secondary/50 bg-secondary/10 text-secondary-foreground",
          "shadow-md shadow-secondary/20",
        ],
        accent: [
          "border-accent/50 bg-accent/10 text-accent-foreground",
          "shadow-md shadow-accent/20",
        ],
        success: [
          "border-success/50 bg-success/10 text-success",
          "shadow-md shadow-success/20",
        ],
        warning: [
          "border-warning/50 bg-warning/10 text-warning",
          "shadow-md shadow-warning/20",
        ],
        error: [
          "border-error/50 bg-error/10 text-error",
          "shadow-md shadow-error/20",
        ],
        info: [
          "border-info/50 bg-info/10 text-info",
          "shadow-md shadow-info/20",
        ],
        outline: [
          "border-border bg-transparent text-foreground",
          "shadow-md shadow-black/5",
        ],
        glass: [
          "border-white/20 bg-white/10 text-foreground backdrop-blur-md",
          "shadow-lg shadow-black/10",
        ],
      } satisfies Record<SonnerVariant, string | string[]>,
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// ============================================================================
// SONNER ICON
// ============================================================================

export const sonnerIconVariants = cva("flex-shrink-0", {
  variants: {
    type: {
      default: "text-foreground",
      success: "text-success",
      error: "text-error",
      warning: "text-warning",
      info: "text-info",
      loading: "text-primary",
    } satisfies Record<SonnerType, string>,
  },
  defaultVariants: {
    type: "default",
  },
});
