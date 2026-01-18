import { cva } from "class-variance-authority";

/**
 * Main container variants with enhanced visual effects
 */
export const aspectRatioVariants = cva(
  [
    // Base styles
    "relative w-full overflow-hidden",
    "transition-all duration-300 ease-out",
    "group isolate",
    // GPU acceleration for smooth animations
    "transform-gpu will-change-transform",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-muted/30",
          "border border-border/30",
          "hover:border-border/50",
          "before:absolute before:inset-0",
          "before:bg-gradient-to-br before:from-primary/5 before:via-transparent before:to-accent/5",
          "before:opacity-0 hover:before:opacity-100",
          "before:transition-opacity before:duration-500",
        ],
        bordered: [
          "border-2 border-border/50",
          "hover:border-primary/40",
          "shadow-sm hover:shadow-md",
          "before:absolute before:inset-0",
          "before:bg-gradient-to-br before:from-primary/10 before:to-transparent",
          "before:opacity-0 hover:before:opacity-100",
          "before:transition-opacity before:duration-500",
        ],
        glass: [
          "bg-white/5 dark:bg-black/5",
          "backdrop-blur-xl backdrop-saturate-150",
          "border border-white/10 dark:border-white/5",
          "shadow-[0_8px_32px_0] shadow-black/10 dark:shadow-black/30",
          "hover:shadow-[0_12px_48px_0] hover:shadow-primary/20",
          "before:absolute before:inset-0",
          "before:bg-gradient-to-br before:from-white/5 before:to-transparent",
          "before:opacity-0 hover:before:opacity-100",
          "before:transition-opacity before:duration-500",
        ],
        "glass-strong": [
          "bg-white/10 dark:bg-black/10",
          "backdrop-blur-2xl backdrop-saturate-200",
          "border-2 border-white/20 dark:border-white/10",
          "shadow-[0_12px_48px_0] shadow-black/15 dark:shadow-black/40",
          "hover:shadow-[0_16px_64px_0] hover:shadow-primary/25",
          "before:absolute before:inset-0",
          "before:bg-gradient-to-br before:from-white/10 before:to-transparent",
          "before:opacity-0 hover:before:opacity-100",
          "before:transition-opacity before:duration-500",
        ],
        gradient: [
          "bg-gradient-to-br from-primary/20 via-background to-accent/20",
          "border-2 border-transparent",
          "relative",
          "before:absolute before:inset-0 before:-z-10",
          "before:bg-gradient-to-r before:from-primary before:via-accent before:to-secondary",
          "before:opacity-50 before:blur-xl",
          "after:absolute after:inset-[2px] after:bg-background/95 after:rounded-[inherit]",
          "hover:before:opacity-75 before:transition-opacity before:duration-500",
        ],
        elevated: [
          "bg-card",
          "border border-border/40",
          "shadow-lg shadow-black/5 dark:shadow-black/20",
          "hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/30",
          "hover:-translate-y-1",
          "before:absolute before:inset-0",
          "before:bg-gradient-to-t before:from-black/5 before:to-transparent",
          "before:opacity-0 hover:before:opacity-100",
          "before:transition-opacity before:duration-300",
        ],
        minimal: [
          "bg-transparent",
          "hover:bg-muted/20",
          "transition-colors duration-300",
        ],
        neon: [
          "bg-black/80",
          "border-2 border-primary/50",
          "shadow-[0_0_20px_0] shadow-primary/30",
          "hover:border-primary hover:shadow-[0_0_40px_0] hover:shadow-primary/50",
          "before:absolute before:inset-0",
          "before:bg-gradient-to-br before:from-primary/10 before:to-accent/10",
          "before:opacity-50",
          "after:absolute after:inset-0",
          "after:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]",
          "after:from-primary/20 after:to-transparent",
          "after:opacity-0 hover:after:opacity-100",
          "after:transition-opacity after:duration-500",
        ],
        frosted: [
          "bg-white/30 dark:bg-white/5",
          "backdrop-blur-3xl backdrop-saturate-200",
          "border border-white/40 dark:border-white/10",
          "shadow-2xl shadow-black/5",
          "hover:bg-white/40 dark:hover:bg-white/10",
          "hover:border-white/60 dark:hover:border-white/20",
          "hover:shadow-[0_25px_50px_-12px] hover:shadow-black/10",
          "transition-all duration-500",
        ],
      },
      rounded: {
        none: "rounded-none before:rounded-none after:rounded-none",
        sm: "rounded-sm before:rounded-sm after:rounded-sm",
        md: "rounded-md before:rounded-md after:rounded-md",
        lg: "rounded-lg before:rounded-lg after:rounded-lg",
        xl: "rounded-xl before:rounded-xl after:rounded-xl",
        "2xl": "rounded-2xl before:rounded-2xl after:rounded-2xl",
        "3xl": "rounded-3xl before:rounded-3xl after:rounded-3xl",
        full: "rounded-full before:rounded-full after:rounded-full",
      },
      interactive: {
        true: [
          "cursor-pointer",
          "focus:outline-none focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-primary/50",
          "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "active:scale-[0.98]",
        ],
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      rounded: "md",
      interactive: false,
    },
  }
);

/**
 * Overlay gradient variants
 */
export const overlayVariants = cva(
  [
    "absolute inset-0 pointer-events-none z-10",
    "transition-opacity duration-300",
  ],
  {
    variants: {
      position: {
        top: "bg-gradient-to-b from-black/60 via-black/20 to-transparent",
        bottom: "bg-gradient-to-t from-black/60 via-black/20 to-transparent",
        left: "bg-gradient-to-r from-black/60 via-black/20 to-transparent",
        right: "bg-gradient-to-l from-black/60 via-black/20 to-transparent",
        center: [
          "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]",
          "from-transparent via-transparent to-black/50",
        ],
        full: "bg-black/40",
      },
    },
    defaultVariants: {
      position: "bottom",
    },
  }
);

/**
 * Skeleton animation variants
 */
export const skeletonVariants = cva(["absolute inset-0", "bg-muted/50"], {
  variants: {
    animation: {
      pulse: "animate-pulse",
      wave: [
        "overflow-hidden",
        "after:absolute after:inset-0",
        "after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent",
        "after:-translate-x-full",
        "after:animate-[shimmer_2s_infinite]",
      ],
      shimmer: [
        "overflow-hidden",
        "bg-gradient-to-r from-muted/50 via-muted/30 to-muted/50",
        "bg-[length:200%_100%]",
        "animate-[shimmer_2s_infinite]",
      ],
    },
  },
  defaultVariants: {
    animation: "pulse",
  },
});

/**
 * Content wrapper styles
 */
export const contentWrapperStyles = cva(
  ["absolute inset-0 w-full h-full", "transform-gpu will-change-transform"],
  {
    variants: {
      objectFit: {
        cover: "[&>*]:object-cover [&>*]:w-full [&>*]:h-full",
        contain: "[&>*]:object-contain [&>*]:w-full [&>*]:h-full",
        fill: "[&>*]:object-fill [&>*]:w-full [&>*]:h-full",
        none: "[&>*]:object-none",
        "scale-down": "[&>*]:object-scale-down [&>*]:w-full [&>*]:h-full",
      },
    },
    defaultVariants: {
      objectFit: "cover",
    },
  }
);

/**
 * Glare effect styles
 */
export const glareStyles = [
  "absolute inset-0 pointer-events-none z-20",
  "transition-opacity duration-150",
  "rounded-[inherit]",
].join(" ");

/**
 * Loading indicator container styles
 */
export const loadingIndicatorStyles = cva(
  [
    "absolute inset-0 flex items-center justify-center",
    "bg-muted/80 backdrop-blur-sm",
    "z-30",
  ],
  {
    variants: {
      variant: {
        spinner: "",
        dots: "",
        bars: "",
        ring: "",
      },
    },
    defaultVariants: {
      variant: "spinner",
    },
  }
);
