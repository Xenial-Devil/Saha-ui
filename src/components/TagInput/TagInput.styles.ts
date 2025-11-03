import { cva } from "class-variance-authority";
/**
 * Container variants
 */
const tagInputContainerVariants = cva(
  [
    "flex flex-wrap items-center gap-2 rounded-lg border-2 transition-all duration-300",
    "focus-within:ring-4 focus-within:ring-offset-2",
    "min-h-[2.5rem] p-2",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-border bg-background",
          "focus-within:border-primary focus-within:ring-primary/50",
        ],
        primary: [
          "border-primary/40 bg-primary/5",
          "focus-within:border-primary focus-within:ring-primary/50",
        ],
        secondary: [
          "border-secondary/40 bg-secondary/5",
          "focus-within:border-secondary focus-within:ring-secondary/50",
        ],
        accent: [
          "border-accent/40 bg-accent/5",
          "focus-within:border-accent focus-within:ring-accent/50",
        ],
        success: [
          "border-success/40 bg-success/5",
          "focus-within:border-success focus-within:ring-success/50",
        ],
        warning: [
          "border-warning/40 bg-warning/5",
          "focus-within:border-warning focus-within:ring-warning/50",
        ],
        error: [
          "border-destructive/40 bg-destructive/5",
          "focus-within:border-destructive focus-within:ring-destructive/50",
        ],
        info: [
          "border-info/40 bg-info/5",
          "focus-within:border-info focus-within:ring-info/50",
        ],
        outline: [
          "border-border bg-transparent",
          "focus-within:border-primary focus-within:ring-primary/50",
        ],
        ghost: [
          "border-transparent bg-muted/30",
          "focus-within:border-primary focus-within:ring-primary/50",
        ],
        glass: [
          "border-white/20 bg-white/10 backdrop-blur-xl",
          "focus-within:border-primary/50 focus-within:ring-primary/30",
        ],
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      disabled: false,
    },
  }
);

/**
 * Tag variants
 */
const tagVariants = cva(
  [
    "inline-flex items-center gap-1.5 rounded-md font-medium transition-all duration-200",
    "animate-in fade-in zoom-in-95",
  ],
  {
    variants: {
      variant: {
        default: "bg-muted text-foreground hover:bg-muted/80",
        primary: "bg-primary/20 text-primary hover:bg-primary/30",
        secondary: "bg-secondary/20 text-secondary hover:bg-secondary/30",
        accent: "bg-accent/20 text-accent hover:bg-accent/30",
        success: "bg-success/20 text-success hover:bg-success/30",
        warning: "bg-warning/20 text-warning hover:bg-warning/30",
        error: "bg-destructive/20 text-destructive hover:bg-destructive/30",
        info: "bg-info/20 text-info hover:bg-info/30",
        outline:
          "border-2 border-border bg-transparent text-foreground hover:bg-muted/50",
        ghost: "bg-transparent text-foreground hover:bg-muted/50",
        glass: "bg-white/10 text-foreground backdrop-blur-sm hover:bg-white/20",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-1 text-sm",
        lg: "px-3 py-1.5 text-base",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "default",
    },
  }
);

/**
 * Input variants
 */
const inputVariants = cva(
  [
    "flex-1 min-w-[120px] bg-transparent outline-none text-foreground",
    "placeholder:text-muted-foreground",
  ],
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);
export { tagInputContainerVariants, tagVariants, inputVariants };