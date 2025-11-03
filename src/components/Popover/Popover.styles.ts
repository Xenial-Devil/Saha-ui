import { cva } from "class-variance-authority";

/**
 * Popover content variants
 */
const popoverVariants = cva(
  [
    "absolute z-50 rounded-lg",
    "transition-all duration-200 ease-out",
    "pointer-events-auto",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-card text-foreground",
          "border border-border/50",
          "shadow-lg",
        ],
        primary: [
          "bg-primary text-primary-foreground",
          "border border-primary/80",
          "shadow-lg shadow-primary/20",
        ],
        secondary: [
          "bg-secondary text-secondary-foreground",
          "border border-secondary/80",
          "shadow-lg shadow-secondary/20",
        ],
        accent: [
          "bg-accent text-accent-foreground",
          "border border-accent/80",
          "shadow-lg shadow-accent/20",
        ],
        success: [
          "bg-success text-success-foreground",
          "border border-success/80",
          "shadow-lg shadow-success/20",
        ],
        warning: [
          "bg-warning text-warning-foreground",
          "border border-warning/80",
          "shadow-lg shadow-warning/20",
        ],
        danger: [
          "bg-destructive text-destructive-foreground",
          "border border-destructive/80",
          "shadow-lg shadow-destructive/20",
        ],
        info: [
          "bg-info text-info-foreground",
          "border border-info/80",
          "shadow-lg shadow-info/20",
        ],
        glass: [
          "backdrop-blur-xl bg-white/80 dark:bg-gray-900/80",
          "border border-white/40 dark:border-white/20",
          "shadow-xl",
        ],
        bordered: [
          "bg-card text-foreground",
          "border-2 border-border",
          "shadow-md",
        ],
        elevated: [
          "bg-card text-foreground",
          "border border-border/30",
          "shadow-2xl",
        ],
        flat: ["bg-card text-foreground", "border border-border/50"],
      },
      size: {
        sm: "text-sm p-2 min-w-[120px] max-w-[200px]",
        md: "text-sm p-3 min-w-[200px] max-w-[320px]",
        lg: "text-base p-4 min-w-[280px] max-w-[400px]",
        xl: "text-base p-5 min-w-[360px] max-w-[500px]",
      },
      position: {
        top: "bottom-full left-1/2 -translate-x-1/2",
        "top-start": "bottom-full left-0",
        "top-end": "bottom-full right-0",
        bottom: "top-full left-1/2 -translate-x-1/2",
        "bottom-start": "top-full left-0",
        "bottom-end": "top-full right-0",
        left: "right-full top-1/2 -translate-y-1/2",
        "left-start": "right-full top-0",
        "left-end": "right-full bottom-0",
        right: "left-full top-1/2 -translate-y-1/2",
        "right-start": "left-full top-0",
        "right-end": "left-full bottom-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      position: "bottom",
    },
  }
);

/**
 * Arrow variants for popover
 */
const arrowVariants = cva("absolute w-3 h-3 rotate-45", {
  variants: {
    variant: {
      default: "bg-card border-l border-t border-border/50",
      primary: "bg-primary border-l border-t border-primary/80",
      secondary: "bg-secondary border-l border-t border-secondary/80",
      accent: "bg-accent border-l border-t border-accent/80",
      success: "bg-success border-l border-t border-success/80",
      warning: "bg-warning border-l border-t border-warning/80",
      danger: "bg-destructive border-l border-t border-destructive/80",
      info: "bg-info border-l border-t border-info/80",
      glass:
        "backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-l border-t border-white/40 dark:border-white/20",
      bordered: "bg-card border-l border-t border-border border-2",
      elevated: "bg-card border-l border-t border-border/30",
      flat: "bg-card border-l border-t border-border/50",
    },
    position: {
      top: "top-full left-1/2 -translate-x-1/2 -translate-y-1/2",
      "top-start": "top-full left-4 -translate-y-1/2",
      "top-end": "top-full right-4 -translate-y-1/2",
      bottom: "bottom-full left-1/2 -translate-x-1/2 translate-y-1/2",
      "bottom-start": "bottom-full left-4 translate-y-1/2",
      "bottom-end": "bottom-full right-4 translate-y-1/2",
      left: "left-full top-1/2 -translate-x-1/2 -translate-y-1/2",
      "left-start": "left-full top-4 -translate-x-1/2",
      "left-end": "left-full bottom-4 -translate-x-1/2",
      right: "right-full top-1/2 translate-x-1/2 -translate-y-1/2",
      "right-start": "right-full top-4 translate-x-1/2",
      "right-end": "right-full bottom-4 translate-x-1/2",
    },
  },
  defaultVariants: {
    variant: "default",
    position: "bottom",
  },
});
export { arrowVariants, popoverVariants };