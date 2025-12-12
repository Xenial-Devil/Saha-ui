import { cva } from "class-variance-authority";
/**
 * Select trigger button variants
 */
const selectTriggerVariants = cva(
  [
    "relative w-full flex items-center justify-between gap-2",
    "rounded-lg border-2 font-medium",
    "transition-all duration-300 ease-out cursor-pointer",
    "focus:outline-none focus:ring-4 focus:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "select-none",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-background border-border text-foreground",
          "hover:border-foreground/60 hover:bg-background/80",
          "focus:ring-ring/50 focus:border-foreground",
        ],
        primary: [
          "bg-primary/5 border-primary/40 text-primary",
          "hover:border-primary hover:bg-primary/10",
          "focus:ring-primary/50 focus:border-primary",
        ],
        secondary: [
          "bg-secondary/5 border-secondary/40 text-secondary",
          "hover:border-secondary hover:bg-secondary/10",
          "focus:ring-secondary/50 focus:border-secondary",
        ],
        accent: [
          "bg-accent/5 border-accent/40 text-accent",
          "hover:border-accent hover:bg-accent/10",
          "focus:ring-accent/50 focus:border-accent",
        ],
        success: [
          "bg-success/5 border-success/40 text-success",
          "hover:border-success hover:bg-success/10",
          "focus:ring-success/50 focus:border-success",
        ],
        warning: [
          "bg-warning/5 border-warning/40 text-warning",
          "hover:border-warning hover:bg-warning/10",
          "focus:ring-warning/50 focus:border-warning",
        ],
        error: [
          "bg-destructive/5 border-destructive/40 text-destructive",
          "hover:border-destructive hover:bg-destructive/10",
          "focus:ring-destructive/50 focus:border-destructive",
        ],
        ghost: [
          "bg-transparent border-transparent text-foreground",
          "hover:bg-foreground/5",
          "focus:ring-ring/50",
        ],
        outline: [
          "bg-transparent border-border text-foreground",
          "hover:border-primary hover:text-primary",
          "focus:ring-primary/50 focus:border-primary",
        ],
        glass: [
          "backdrop-blur-xl bg-background/30 border-border/50",
          "shadow-lg text-foreground",
          "hover:bg-background/40 hover:border-border",
          "focus:ring-primary/50 focus:border-primary",
        ],
      },
      size: {
        xs: "px-2 py-1 text-xs gap-1",
        sm: "px-3 py-1.5 text-sm gap-1.5",
        md: "px-4 py-2.5 text-base gap-2",
        lg: "px-5 py-3 text-lg gap-2.5",
        xl: "px-6 py-3.5 text-xl gap-3",
        "2xl": "px-7 py-4 text-2xl gap-3.5",
        "3xl": "px-8 py-5 text-3xl gap-4",
        "4xl": "px-10 py-6 text-4xl gap-5",
      },
      error: {
        true: "border-destructive focus:ring-destructive/50 focus:border-destructive",
        false: "",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto min-w-[200px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      error: false,
      fullWidth: false,
    },
  }
);

/**
 * Select dropdown menu variants
 */
const selectMenuVariants = cva(
  [
    "absolute z-50 mt-2 w-full rounded-lg border-2",
    "bg-background shadow-xl",
    "overflow-hidden",
    "animate-in fade-in-0 zoom-in-95",
  ],
  {
    variants: {
      variant: {
        default: "border-border",
        primary: "border-primary/40",
        secondary: "border-secondary/40",
        accent: "border-accent/40",
        success: "border-success/40",
        warning: "border-warning/40",
        error: "border-destructive/40",
        ghost: "border-border",
        outline: "border-border",
        glass: "backdrop-blur-xl bg-background/95 border-border/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Select option item variants
 */
const selectOptionVariants = cva(
  [
    "flex items-center gap-3 px-4 py-2.5 cursor-pointer",
    "transition-all duration-200",
    "select-none",
  ],
  {
    variants: {
      variant: {
        default: "hover:bg-foreground/5 data-[selected=true]:bg-foreground/10",
        primary:
          "hover:bg-primary/5 data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary",
        secondary:
          "hover:bg-secondary/5 data-[selected=true]:bg-secondary/10 data-[selected=true]:text-secondary",
        accent:
          "hover:bg-accent/5 data-[selected=true]:bg-accent/10 data-[selected=true]:text-accent",
        success:
          "hover:bg-success/5 data-[selected=true]:bg-success/10 data-[selected=true]:text-success",
        warning:
          "hover:bg-warning/5 data-[selected=true]:bg-warning/10 data-[selected=true]:text-warning",
        error:
          "hover:bg-destructive/5 data-[selected=true]:bg-destructive/10 data-[selected=true]:text-destructive",
        ghost: "hover:bg-foreground/5 data-[selected=true]:bg-foreground/10",
        outline:
          "hover:bg-primary/5 data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary",
        glass: "hover:bg-background/50 data-[selected=true]:bg-background/80",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed hover:bg-transparent",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      disabled: false,
    },
  }
);
export { selectTriggerVariants, selectMenuVariants, selectOptionVariants };
