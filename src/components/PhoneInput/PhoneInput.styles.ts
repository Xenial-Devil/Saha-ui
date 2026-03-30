import { cva } from "class-variance-authority";

export const phoneInputContainerVariants = cva(
  "relative flex w-full rounded-xl border border-border bg-card transition-colors duration-200 focus-within:border-primary focus-within:ring-4 focus-within:ring-ring/20 group",
  {
    variants: {
      error: {
        true: "border-destructive focus-within:border-destructive focus-within:ring-destructive/20",
        false: "hover:border-border/80",
      },
      disabled: {
        true: "opacity-50 pointer-events-none cursor-not-allowed bg-muted/50",
        false: "",
      },
      size: {
        sm: "h-9",
        md: "h-11",
        lg: "h-13",
      },
      variant: {
        default: "",
        glass: "bg-white/10 dark:bg-black/10 backdrop-blur-xl border-white/20",
        outline: "bg-transparent",
        filled: "bg-muted/50 border-transparent",
      }
    },
    defaultVariants: {
      error: false,
      disabled: false,
      size: "md",
      variant: "default",
    },
  }
);

export const phoneInputSelectVariants = cva(
  "flex h-full items-center justify-center rounded-l-xl border-r border-border bg-transparent px-3 outline-none hover:bg-muted/50 cursor-pointer min-w-[80px]",
  {
    variants: {
      disabled: {
        true: "opacity-50 pointer-events-none",
        false: "",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

export const phoneInputFieldVariants = cva(
  "flex-1 bg-transparent px-3 outline-none min-w-0 placeholder:text-muted-foreground tabular-nums",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);
