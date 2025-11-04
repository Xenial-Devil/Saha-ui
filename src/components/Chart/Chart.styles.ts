// components/Chart.styles.ts
import { cva } from "class-variance-authority";

export const chartContainerVariants = cva(
  "relative overflow-hidden rounded-2xl border border-border/60 " +
    "bg-gradient-to-b from-muted/50 to-background shadow-sm ring-1 ring-black/5 transition-all",
  {
    variants: {
      variant: {
        default: "",
        primary: "from-primary/10",
        secondary: "from-secondary/10",
        accent: "from-accent/10",
        success: "from-emerald-500/10",
        warning: "from-amber-500/10",
        error: "from-rose-500/10",
        info: "from-sky-500/10",
        outline: "border-2",
        ghost: "bg-transparent shadow-none ring-0",
        glass:
          "backdrop-blur supports-[backdrop-filter]:bg-background/60 border-border/40 ring-1 ring-white/10",
      },
      size: {
        sm: "p-4",
        md: "p-5",
        lg: "p-6",
        xl: "p-8",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

export const chartCanvasVariants = cva(
  "rounded-xl bg-card/40 backdrop-blur-sm",
  {
    variants: {
      size: {
        sm: "h-[220px]",
        md: "h-[320px]",
        lg: "h-[380px]",
        xl: "h-[460px]",
      },
    },
    defaultVariants: { size: "md" },
  }
);
