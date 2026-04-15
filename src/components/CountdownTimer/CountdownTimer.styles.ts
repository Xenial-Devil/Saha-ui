import { cva } from "class-variance-authority";

export const countdownTimerVariants = cva(
  "inline-flex items-start gap-2",
  {
    variants: {
      variant: {
        default: "text-foreground",
        primary: "text-primary",
        secondary: "text-secondary",
        glass: "bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 p-4 rounded-xl",
        outline: "border-2 border-border p-4 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const countdownDigitVariants = cva(
  "tabular-nums leading-none",
  {
    variants: {
      size: {
        sm: "text-xl font-bold font-mono",
        md: "text-3xl font-bold font-mono tracking-tight",
        lg: "text-5xl font-black font-mono tracking-tighter",
        xl: "text-7xl font-black font-mono tracking-tighter",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const countdownLabelVariants = cva(
  "uppercase font-semibold text-muted-foreground",
  {
    variants: {
      size: {
        sm: "text-[10px] tracking-wider mt-1",
        md: "text-xs tracking-wider mt-1",
        lg: "text-sm tracking-wider mt-2",
        xl: "text-base tracking-widest mt-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const countdownSeparatorVariants = cva(
  "opacity-50 mt-[-2px] sm:mt-[-4px]",
  {
    variants: {
      size: {
        sm: "text-xl font-bold font-mono",
        md: "text-3xl font-bold font-mono tracking-tight",
        lg: "text-5xl font-black font-mono tracking-tighter",
        xl: "text-7xl font-black font-mono tracking-tighter",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);
