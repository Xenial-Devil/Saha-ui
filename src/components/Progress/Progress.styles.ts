import { cva } from "class-variance-authority";

/**
 * Progress track - enhanced background with glow effects
 */
const progressVariants = cva(
  [
    "relative w-full overflow-hidden",
    "bg-black/[0.08] dark:bg-white/[0.08]",
    "transition-all duration-300 ease-out",
    "shadow-inner",
    "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:opacity-50",
  ],
  {
    variants: {
      size: {
        xs: "h-1.5",
        sm: "h-2.5",
        md: "h-4",
        lg: "h-6",
        xl: "h-8",
        "2xl": "h-10",
        "3xl": "h-12",
        "4xl": "h-16",
      },
      shape: {
        rounded: "rounded-lg",
        pill: "rounded-full",
        square: "rounded-sm",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "rounded",
    },
  }
);

/**
 * Progress bar - enhanced with glow and shimmer effects
 */
const progressBarVariants = cva(
  [
    "h-full relative overflow-hidden",
    "transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
    "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent",
    "before:translate-x-[-100%] before:animate-[shimmer_2s_infinite]",
    "after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/20 after:to-transparent after:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-[oklch(0.60_0.24_250)]",
          "dark:bg-[oklch(0.70_0.20_250)]",
          "shadow-lg shadow-[oklch(0.60_0.24_250)]/50",
        ],
        primary: "bg-primary shadow-lg shadow-primary/50",
        secondary: "bg-secondary shadow-lg shadow-secondary/50",
        accent: "bg-accent shadow-lg shadow-accent/50",
        success: [
          "bg-[oklch(0.70_0.20_145)]",
          "dark:bg-[oklch(0.75_0.18_145)]",
          "shadow-lg shadow-[oklch(0.70_0.20_145)]/50",
        ],
        warning: [
          "bg-[oklch(0.80_0.16_75)]",
          "dark:bg-[oklch(0.82_0.16_75)]",
          "shadow-lg shadow-[oklch(0.80_0.16_75)]/50",
        ],
        error: [
          "bg-[oklch(0.64_0.26_15)]",
          "dark:bg-[oklch(0.68_0.24_15)]",
          "shadow-lg shadow-[oklch(0.64_0.26_15)]/50",
        ],
        info: "bg-info shadow-lg shadow-info/50",
        gradient: [
          "bg-gradient-to-r",
          "from-[oklch(0.65_0.25_250)] via-[oklch(0.60_0.28_300)] to-[oklch(0.68_0.26_330)]",
          "dark:from-[oklch(0.70_0.22_250)] dark:via-[oklch(0.65_0.25_300)] dark:to-[oklch(0.72_0.24_330)]",
          "shadow-xl shadow-[oklch(0.65_0.25_250)]/60",
        ],
        striped: "bg-primary shadow-lg shadow-primary/50",
        glass: [
          "backdrop-blur-xl bg-white/40 dark:bg-white/20",
          "border border-white/60 dark:border-white/30",
          "shadow-xl shadow-white/30",
        ],
      },
      glow: {
        true: "drop-shadow-[0_0_12px_currentColor]",
        false: "",
      },
      striped: {
        true: [
          "bg-[linear-gradient(45deg,rgba(255,255,255,.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.2)_50%,rgba(255,255,255,.2)_75%,transparent_75%,transparent)]",
          "bg-[length:1.5rem_1.5rem]",
        ],
        false: "",
      },
      stripedAnimated: {
        true: "animate-[progress-stripes_1.2s_linear_infinite]",
        false: "",
      },
    },
    compoundVariants: [],
    defaultVariants: {
      variant: "default",
      glow: false,
      striped: false,
      stripedAnimated: false,
    },
  }
);

/**
 * Progress label - clean typography
 */
const progressLabelVariants = cva(
  "font-semibold tabular-nums transition-all duration-300",
  {
    variants: {
      position: {
        inside: [
          "absolute inset-0 flex items-center justify-center",
          "text-white dark:text-white",
          "font-bold tracking-tight",
        ],
        outside: [
          "ml-3 text-foreground/80 dark:text-foreground/70",
          "font-medium",
        ],
        top: ["mb-2 text-foreground/80 dark:text-foreground/70", "font-medium"],
      },
      size: {
        xs: "text-[9px]",
        sm: "text-[11px]",
        md: "text-xs",
        lg: "text-sm",
        xl: "text-base",
        "2xl": "text-lg",
        "3xl": "text-xl",
        "4xl": "text-2xl",
      },
    },
    defaultVariants: {
      position: "inside",
      size: "md",
    },
  }
);
export { progressVariants, progressBarVariants, progressLabelVariants };
