import { cva } from "class-variance-authority";

/**
 * ResizablePanelGroup variants
 */
export const resizablePanelGroupVariants = cva(
  "flex gap-0 w-full h-full relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-background",
        primary: "bg-primary/5",
        secondary: "bg-secondary/5",
        accent: "bg-accent/5",
        success: "bg-success/5",
        warning: "bg-warning/5",
        error: "bg-error/5",
        info: "bg-info/5",
        outline: "bg-background border border-border",
        glass:
          "bg-background/20 backdrop-blur-xl border border-white/10 shadow-xl",
      },
      direction: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
    },
    defaultVariants: {
      variant: "default",
      direction: "horizontal",
    },
  }
);

/**
 * ResizablePanel variants
 */
export const resizablePanelVariants = cva(
  "relative overflow-auto transition-all duration-150",
  {
    variants: {
      variant: {
        default: "bg-background",
        primary: "bg-primary/5",
        secondary: "bg-secondary/5",
        accent: "bg-accent/5",
        success: "bg-success/5",
        warning: "bg-warning/5",
        error: "bg-error/5",
        info: "bg-info/5",
        outline: "bg-background",
        glass: "bg-background/10 backdrop-blur-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * ResizableHandle variants
 */
export const resizableHandleVariants = cva(
  [
    "relative flex-shrink-0 transition-all duration-200",
    "hover:bg-primary/20 active:bg-primary/30",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "group",
  ],
  {
    variants: {
      variant: {
        default: "bg-border hover:bg-primary/20",
        primary: "bg-primary/20 hover:bg-primary/30",
        secondary: "bg-secondary/20 hover:bg-secondary/30",
        accent: "bg-accent/20 hover:bg-accent/30",
        success: "bg-success/20 hover:bg-success/30",
        warning: "bg-warning/20 hover:bg-warning/30",
        error: "bg-error/20 hover:bg-error/30",
        info: "bg-info/20 hover:bg-info/30",
        outline: "bg-border hover:bg-foreground/10",
        glass:
          "bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20",
      },
      direction: {
        horizontal: "cursor-col-resize w-1.5 h-full hover:w-2",
        vertical: "cursor-row-resize h-1.5 w-full hover:h-2",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50 hover:bg-border",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      direction: "horizontal",
      disabled: false,
    },
  }
);

/**
 * ResizableHandle indicator variants
 */
export const resizableHandleIndicatorVariants = cva(
  [
    "absolute inset-0 flex items-center justify-center",
    "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
  ],
  {
    variants: {
      variant: {
        default: "text-foreground/50",
        primary: "text-primary",
        secondary: "text-secondary",
        accent: "text-accent",
        success: "text-success",
        warning: "text-warning",
        error: "text-error",
        info: "text-info",
        outline: "text-foreground/50",
        glass: "text-white/70",
      },
      direction: {
        horizontal: "",
        vertical: "",
      },
    },
    defaultVariants: {
      variant: "default",
      direction: "horizontal",
    },
  }
);

/**
 * ResizableHandle dots style
 */
export const resizableHandleDotsVariants = cva("rounded-full bg-current", {
  variants: {
    direction: {
      horizontal: "w-1 h-1",
      vertical: "w-1 h-1",
    },
  },
  defaultVariants: {
    direction: "horizontal",
  },
});
