import { cva } from "class-variance-authority";
/**
 * Container variants
 */
const containerVariants = cva(
  [
    "flex flex-col w-full overflow-hidden",
    "rounded-xl shadow-2xl border-2",
    "bg-card text-card-foreground",
    "transition-all duration-300",
  ],
  {
    variants: {
      variant: {
        default: "border-border",
        primary: "border-primary/30 shadow-primary/20",
        secondary: "border-secondary/30 shadow-secondary/20",
        accent: "border-accent/30 shadow-accent/20",
        success: "border-success/30 shadow-success/20",
        warning: "border-warning/30 shadow-warning/20",
        error: "border-error/30 shadow-error/20",
        info: "border-info/30 shadow-info/20",
        ghost: "border-transparent shadow-none bg-transparent",
        glass: "border-border/20 backdrop-blur-xl bg-background/80 shadow-xl",
        outline: "border-border bg-transparent shadow-lg",
      },
      size: {
        xs: "max-w-xs",
        sm: "max-w-sm",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-3xl",
        "2xl": "max-w-4xl",
        "3xl": "max-w-5xl",
        "4xl": "max-w-6xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

/**
 * Input variants
 */
const inputVariants = cva(
  [
    "w-full px-4 border-b-2 border-border/50",
    "bg-transparent text-foreground placeholder:text-muted-foreground",
    "focus:outline-none focus:border-primary/50",
    "transition-colors duration-200",
  ],
  {
    variants: {
      size: {
        xs: "py-1.5 text-xs",
        sm: "py-2 text-sm",
        md: "py-3 text-base",
        lg: "py-4 text-lg",
        xl: "py-5 text-xl",
        "2xl": "py-6 text-2xl",
        "3xl": "py-7 text-3xl",
        "4xl": "py-8 text-4xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/**
 * Item variants
 */
const itemVariants = cva(
  [
    "w-full flex items-center gap-3 px-4 cursor-pointer",
    "transition-all duration-200 select-none",
    "hover:bg-accent/10 hover:scale-[1.01]",
    "active:scale-[0.99]",
  ],
  {
    variants: {
      selected: {
        true: "bg-primary/10 font-semibold shadow-sm",
        false: "",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed hover:bg-transparent hover:scale-100",
        false: "",
      },
      size: {
        xs: "py-1 text-xs min-h-[28px]",
        sm: "py-1.5 text-sm min-h-[32px]",
        md: "py-2.5 text-base min-h-[40px]",
        lg: "py-3 text-lg min-h-[48px]",
        xl: "py-3.5 text-xl min-h-[56px]",
        "2xl": "py-4 text-2xl min-h-[64px]",
        "3xl": "py-5 text-3xl min-h-[72px]",
        "4xl": "py-6 text-4xl min-h-[80px]",
      },
    },
    defaultVariants: {
      selected: false,
      disabled: false,
      size: "md",
    },
  }
);
export { containerVariants, inputVariants, itemVariants };
