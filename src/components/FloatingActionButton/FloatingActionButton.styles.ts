import { cva } from "class-variance-authority";
/**
 * FAB variants using CVA
 */
export const fabVariants = cva(
  [
    "group fixed inline-flex items-center justify-center gap-2",
    "rounded-full font-medium transition-all duration-300 ease-out",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-40 disabled:saturate-50",
    "overflow-hidden isolate cursor-pointer z-50",
    // Enhanced shadow effects
    "shadow-[0_8px_32px_0] hover:shadow-[0_12px_48px_0]",
    // Gradient overlays
    "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent",
    "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
    "after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/10 after:to-transparent",
    "after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300",
    // Hover effects
    "hover:scale-110 active:scale-95",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-card text-foreground border-2 border-border",
          "shadow-black/10 hover:shadow-black/20",
          "hover:border-primary/40",
        ],
        primary: [
          "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground",
          "border-2 border-primary/80",
          "shadow-primary/40 hover:shadow-primary/70",
          "hover:brightness-110 active:brightness-90",
        ],
        secondary: [
          "bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground",
          "border-2 border-secondary/80",
          "shadow-secondary/40 hover:shadow-secondary/70",
          "hover:brightness-110 active:brightness-90",
        ],
        accent: [
          "bg-gradient-to-br from-accent to-accent/80 text-accent-foreground",
          "border-2 border-accent/80",
          "shadow-accent/40 hover:shadow-accent/70",
          "hover:brightness-110 active:brightness-90",
        ],
        info: [
          "bg-gradient-to-br from-info to-info/80 text-info-foreground",
          "border-2 border-info/80",
          "shadow-info/40 hover:shadow-info/70",
          "hover:brightness-110 active:brightness-90",
        ],
        success: [
          "bg-gradient-to-br from-success to-success/80 text-success-foreground",
          "border-2 border-success/80",
          "shadow-success/40 hover:shadow-success/70",
          "hover:brightness-110 active:brightness-90",
        ],
        warning: [
          "bg-gradient-to-br from-warning to-warning/80 text-warning-foreground",
          "border-2 border-warning/80",
          "shadow-warning/40 hover:shadow-warning/70",
          "hover:brightness-110 active:brightness-90",
        ],
        error: [
          "bg-gradient-to-br from-destructive to-destructive/80 text-destructive-foreground",
          "border-2 border-destructive/80",
          "shadow-destructive/40 hover:shadow-destructive/70",
          "hover:brightness-110 active:brightness-90",
        ],
        glass: [
          "glass backdrop-blur-2xl",
          "border-2 border-border/30 hover:border-primary/40",
          "bg-background/40 text-foreground",
          "shadow-black/10 hover:shadow-primary/20",
        ],
      },
      size: {
        sm: "h-12 w-12 text-sm",
        md: "h-14 w-14 text-base",
        lg: "h-16 w-16 text-lg",
        xl: "h-20 w-20 text-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);
/**
 * Label wrapper variants
 */
export const labelVariants = cva(
  [
    "absolute whitespace-nowrap px-3 py-1.5 rounded-lg",
    "bg-card/95 backdrop-blur-sm text-foreground text-sm font-medium",
    "border border-border/50 shadow-lg",
    "transition-all duration-300 ease-out",
    "pointer-events-none z-10",
  ],
  {
    variants: {
      position: {
        "bottom-right": "right-full mr-3 top-1/2 -translate-y-1/2",
        "bottom-left": "left-full ml-3 top-1/2 -translate-y-1/2",
        "top-right": "right-full mr-3 top-1/2 -translate-y-1/2",
        "top-left": "left-full ml-3 top-1/2 -translate-y-1/2",
      },
    },
    defaultVariants: {
      position: "bottom-right",
    },
  }
);