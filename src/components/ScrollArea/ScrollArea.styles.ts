import { cva } from "class-variance-authority";

/**
 * ScrollAreaRoot variants
 */
export const scrollAreaRootVariants = cva(
  "relative overflow-hidden rounded-lg",
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
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * ScrollBar variants
 */
export const scrollBarVariants = cva(
  [
    "absolute z-10 flex touch-none select-none",
    "transition-all duration-200",
    "hover:bg-accent/10",
  ],
  {
    variants: {
      variant: {
        default: "bg-transparent",
        primary: "bg-primary/5",
        secondary: "bg-secondary/5",
        accent: "bg-accent/5",
        success: "bg-success/5",
        warning: "bg-warning/5",
        error: "bg-error/5",
        info: "bg-info/5",
        outline: "bg-transparent",
        glass: "bg-white/5 backdrop-blur-sm",
      },
      orientation: {
        vertical: "right-0 top-0 h-full w-2.5 flex-col p-px",
        horizontal: "bottom-0 left-0 w-full h-2.5 flex-row p-px",
      },
    },
    defaultVariants: {
      variant: "default",
      orientation: "vertical",
    },
  }
);

/**
 * ScrollThumb variants
 */
export const scrollThumbVariants = cva(
  [
    "relative rounded-full transition-all duration-200 cursor-grab active:cursor-grabbing",
    "hover:opacity-100",
  ],
  {
    variants: {
      variant: {
        default: "bg-border opacity-50 hover:bg-border/80",
        primary: "bg-primary opacity-50 hover:bg-primary/80",
        secondary: "bg-secondary opacity-50 hover:bg-secondary/80",
        accent: "bg-accent opacity-50 hover:bg-accent/80",
        success: "bg-success opacity-50 hover:bg-success/80",
        warning: "bg-warning opacity-50 hover:bg-warning/80",
        error: "bg-error opacity-50 hover:bg-error/80",
        info: "bg-info opacity-50 hover:bg-info/80",
        outline: "bg-border opacity-50 hover:bg-foreground/20",
        glass: "bg-white/30 opacity-50 hover:bg-white/50 backdrop-blur-sm",
      },
      orientation: {
        vertical: "min-h-[20px]",
        horizontal: "min-w-[20px]",
      },
    },
    defaultVariants: {
      variant: "default",
      orientation: "vertical",
    },
  }
);
