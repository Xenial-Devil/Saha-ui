import { cva } from "class-variance-authority";
/**
 * TextArea variants
 */
const textAreaVariants = cva(
  [
    "w-full rounded-lg border-2 transition-all duration-300 resize-none",
    "focus:outline-none focus:ring-4 focus:ring-offset-2",
    "placeholder:text-muted-foreground",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-border bg-background text-foreground",
          "focus:border-primary focus:ring-primary/50",
          "hover:border-foreground/60",
        ],
        primary: [
          "border-primary/40 bg-primary/5 text-foreground",
          "focus:border-primary focus:ring-primary/50",
          "hover:border-primary/60",
        ],
        secondary: [
          "border-secondary/40 bg-secondary/5 text-foreground",
          "focus:border-secondary focus:ring-secondary/50",
          "hover:border-secondary/60",
        ],
        accent: [
          "border-accent/40 bg-accent/5 text-foreground",
          "focus:border-accent focus:ring-accent/50",
          "hover:border-accent/60",
        ],
        success: [
          "border-success/40 bg-success/5 text-foreground",
          "focus:border-success focus:ring-success/50",
          "hover:border-success/60",
        ],
        warning: [
          "border-warning/40 bg-warning/5 text-foreground",
          "focus:border-warning focus:ring-warning/50",
          "hover:border-warning/60",
        ],
        error: [
          "border-destructive/40 bg-destructive/5 text-foreground",
          "focus:border-destructive focus:ring-destructive/50",
          "hover:border-destructive/60",
        ],
        info: [
          "border-info/40 bg-info/5 text-foreground",
          "focus:border-info focus:ring-info/50",
          "hover:border-info/60",
        ],
        outline: [
          "border-border bg-transparent text-foreground",
          "focus:border-primary focus:ring-primary/50",
          "hover:border-foreground/60",
        ],
        ghost: [
          "border-transparent bg-muted/30 text-foreground",
          "focus:border-primary focus:ring-primary/50",
          "hover:bg-muted/50",
        ],
        glass: [
          "border-white/20 bg-white/10 text-foreground backdrop-blur-xl",
          "focus:border-primary/50 focus:ring-primary/30",
          "hover:border-white/30",
        ],
      },
      size: {
        sm: "px-3 py-2 text-sm min-h-[80px]",
        md: "px-4 py-2.5 text-base min-h-[120px]",
        lg: "px-5 py-3 text-lg min-h-[160px]",
      },
      rounded: {
        default: "rounded-lg",
        full: "rounded-2xl",
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
 * Character count variants
 */
const countVariants = cva(
  ["absolute text-xs font-medium transition-colors duration-200"],
  {
    variants: {
      position: {
        "top-right": "top-2 right-2",
        "bottom-right": "bottom-2 right-2",
        "bottom-left": "bottom-2 left-2",
      },
      status: {
        normal: "text-muted-foreground",
        warning: "text-warning",
        error: "text-destructive",
      },
    },
    defaultVariants: {
      position: "bottom-right",
      status: "normal",
    },
  }
);
export { textAreaVariants, countVariants };