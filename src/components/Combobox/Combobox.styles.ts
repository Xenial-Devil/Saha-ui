import { cva } from "class-variance-authority";
/**
 * Trigger button variants
 */
const triggerVariants = cva(
  [
    "w-full inline-flex items-center justify-between gap-2",
    "px-4 py-2.5 rounded-lg border-2 transition-all duration-300",
    "font-medium text-left cursor-pointer select-none",
    "focus:outline-none focus:ring-4 focus:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    "hover:shadow-md active:scale-[0.98]",
    "relative isolate",
    "before:absolute before:inset-0 before:rounded-lg",
    "before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-black/10",
    "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-border bg-background text-foreground",
          "hover:bg-muted/30 hover:border-primary/30",
          "focus:border-primary focus:ring-primary/50",
        ],
        primary: [
          "border-primary/40 bg-primary/5 text-foreground",
          "hover:bg-primary/10 hover:border-primary/60",
          "focus:border-primary focus:ring-primary/50",
        ],
        secondary: [
          "border-secondary/40 bg-secondary/5 text-foreground",
          "hover:bg-secondary/10 hover:border-secondary/60",
          "focus:border-secondary focus:ring-secondary/50",
        ],
        accent: [
          "border-accent/40 bg-accent/5 text-foreground",
          "hover:bg-accent/10 hover:border-accent/60",
          "focus:border-accent focus:ring-accent/50",
        ],
        success: [
          "border-success/40 bg-success/5 text-foreground",
          "hover:bg-success/10 hover:border-success/60",
          "focus:border-success focus:ring-success/50",
        ],
        warning: [
          "border-warning/40 bg-warning/5 text-foreground",
          "hover:bg-warning/10 hover:border-warning/60",
          "focus:border-warning focus:ring-warning/50",
        ],
        error: [
          "border-destructive/40 bg-destructive/5 text-foreground",
          "hover:bg-destructive/10 hover:border-destructive/60",
          "focus:border-destructive focus:ring-destructive/50",
        ],
        info: [
          "border-info/40 bg-info/5 text-foreground",
          "hover:bg-info/10 hover:border-info/60",
          "focus:border-info focus:ring-info/50",
        ],
        ghost: [
          "border-transparent bg-muted/30 text-foreground",
          "hover:bg-muted/50 hover:border-border/30",
          "focus:border-primary focus:ring-primary/50",
        ],
        glass: [
          "border-white/20 bg-white/10 text-foreground backdrop-blur-xl",
          "hover:bg-white/20 hover:border-white/30",
          "focus:border-primary/50 focus:ring-primary/30",
        ],
        outline: [
          "border-border bg-transparent text-foreground",
          "hover:bg-muted/20 hover:border-primary/30",
          "focus:border-primary focus:ring-primary/50",
        ],
      },
      size: {
        sm: "text-sm px-3 py-1.5 min-h-[32px]",
        md: "text-base px-4 py-2.5 min-h-[40px]",
        lg: "text-lg px-5 py-3 min-h-[48px]",
      },
      hasError: {
        true: "border-destructive/50 focus:border-destructive focus:ring-destructive/50",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      hasError: false,
    },
  }
);

/**
 * Dropdown content variants
 */
const contentVariants = cva(
  [
    "absolute z-50 mt-2 w-full",
    "border-2 rounded-xl shadow-2xl",
    "backdrop-blur-xl overflow-hidden",
    "animate-in fade-in-50 zoom-in-95 slide-in-from-top-2 duration-200",
  ],
  {
    variants: {
      variant: {
        default: "border-border bg-background/95",
        primary: "border-primary/30 bg-background/95",
        secondary: "border-secondary/30 bg-background/95",
        accent: "border-accent/30 bg-background/95",
        success: "border-success/30 bg-background/95",
        warning: "border-warning/30 bg-background/95",
        error: "border-destructive/30 bg-background/95",
        info: "border-info/30 bg-background/95",
        ghost: "border-border/50 bg-background/90",
        glass: "border-white/20 bg-white/10 backdrop-blur-2xl",
        outline: "border-border bg-background/95",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Option item variants
 */
const optionVariants = cva(
  [
    "w-full flex items-center gap-3 px-4 py-2.5 cursor-pointer",
    "transition-all duration-200 select-none",
    "hover:bg-accent/10 hover:scale-[1.01]",
    "active:scale-[0.99]",
  ],
  {
    variants: {
      selected: {
        true: "bg-primary/10 font-semibold",
        false: "",
      },
      highlighted: {
        true: "bg-accent/15 shadow-sm",
        false: "",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed hover:bg-transparent hover:scale-100",
        false: "",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2.5 text-base",
        lg: "px-5 py-3 text-lg",
      },
    },
    defaultVariants: {
      selected: false,
      highlighted: false,
      disabled: false,
      size: "md",
    },
  }
);

/**
 * Search input variants
 */
const searchVariants = cva(
  [
    "w-full px-4 py-2.5 border-b-2 border-border/50",
    "bg-transparent text-foreground placeholder:text-muted-foreground",
    "focus:outline-none focus:border-primary/50",
    "transition-colors duration-200",
  ],
  {
    variants: {
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2.5 text-base",
        lg: "px-5 py-3 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);
export {
  triggerVariants,
  contentVariants,
  optionVariants,
  searchVariants,
};