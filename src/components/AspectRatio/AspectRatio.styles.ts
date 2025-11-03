import { cva } from "class-variance-authority";
const aspectRatioVariants = cva(
  [
    "relative w-full overflow-hidden",
    "transition-all duration-300 ease-out",
    "group isolate",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-muted/30 border border-border/30",
          "hover:border-border/50",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:via-transparent before:to-accent/5",
          "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        ],
        bordered: [
          "border-2 border-border/50",
          "hover:border-primary/40",
          "shadow-sm hover:shadow-md",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/10 before:to-transparent",
          "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        ],
        glass: [
          "glass backdrop-blur-xl",
          "border border-white/10 dark:border-white/5",
          "shadow-[0_8px_32px_0] shadow-black/10 dark:shadow-black/30",
          "hover:shadow-[0_12px_48px_0] hover:shadow-primary/20",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent",
          "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        ],
        "glass-strong": [
          "glass-strong backdrop-blur-2xl",
          "border-2 border-white/20 dark:border-white/10",
          "shadow-[0_12px_48px_0] shadow-black/15 dark:shadow-black/40",
          "hover:shadow-[0_16px_64px_0] hover:shadow-primary/25",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent",
          "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        ],
        gradient: [
          "bg-gradient-to-br from-primary/20 via-background to-accent/20",
          "border-2 border-transparent",
          "relative",
          "before:absolute before:inset-0 before:-z-10",
          "before:bg-gradient-to-r before:from-primary before:via-accent before:to-secondary",
          "before:opacity-50 before:blur-xl",
          "after:absolute after:inset-[2px] after:bg-background/95 after:rounded-[inherit]",
          "hover:before:opacity-75 before:transition-opacity before:duration-500",
        ],
      },
      rounded: {
        none: "rounded-none before:rounded-none after:rounded-none",
        sm: "rounded-sm before:rounded-sm after:rounded-sm",
        md: "rounded-md before:rounded-md after:rounded-md",
        lg: "rounded-lg before:rounded-lg after:rounded-lg",
        xl: "rounded-xl before:rounded-xl after:rounded-xl",
        "2xl": "rounded-2xl before:rounded-2xl after:rounded-2xl",
        full: "rounded-full before:rounded-full after:rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      rounded: "md",
    },
  }
);

/**
 * Overlay gradient variants
 */
const overlayVariants = cva(
  [
    "absolute inset-0 pointer-events-none z-10",
    "transition-opacity duration-300",
  ],
  {
    variants: {
      position: {
        top: "bg-gradient-to-b from-black/50 via-transparent to-transparent",
        bottom: "bg-gradient-to-t from-black/50 via-transparent to-transparent",
        left: "bg-gradient-to-r from-black/50 via-transparent to-transparent",
        right: "bg-gradient-to-l from-black/50 via-transparent to-transparent",
        center:
          "bg-radial-gradient from-transparent via-transparent to-black/40",
      },
    },
    defaultVariants: {
      position: "bottom",
    },
  }
);
export { aspectRatioVariants, overlayVariants };
