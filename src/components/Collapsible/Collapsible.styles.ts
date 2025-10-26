import { cva } from "class-variance-authority";

/**
 * Collapsible container styles
 */
export const collapsibleVariants = cva(
  [
    "w-full",
    "rounded-lg",
    "transition-all duration-300",
    "relative",
    "overflow-hidden",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-card",
          "border border-border",
          "shadow-sm",
          "hover:shadow-md",
        ],
        primary: [
          "bg-primary/5",
          "border border-primary/20",
          "shadow-sm shadow-primary/5",
          "hover:border-primary/30",
          "hover:bg-primary/10",
        ],
        secondary: [
          "bg-secondary/5",
          "border border-secondary/20",
          "shadow-sm shadow-secondary/5",
          "hover:border-secondary/30",
          "hover:bg-secondary/10",
        ],
        accent: [
          "bg-accent/5",
          "border border-accent/20",
          "shadow-sm shadow-accent/5",
          "hover:border-accent/30",
          "hover:bg-accent/10",
        ],
        success: [
          "bg-success/5",
          "border border-success/20",
          "shadow-sm shadow-success/5",
          "hover:border-success/30",
          "hover:bg-success/10",
        ],
        warning: [
          "bg-warning/5",
          "border border-warning/20",
          "shadow-sm shadow-warning/5",
          "hover:border-warning/30",
          "hover:bg-warning/10",
        ],
        error: [
          "bg-destructive/5",
          "border border-destructive/20",
          "shadow-sm shadow-destructive/5",
          "hover:border-destructive/30",
          "hover:bg-destructive/10",
        ],
        info: [
          "bg-blue-500/5",
          "border border-blue-500/20",
          "shadow-sm shadow-blue-500/5",
          "hover:border-blue-500/30",
          "hover:bg-blue-500/10",
        ],
        outline: [
          "bg-transparent",
          "border-2 border-border",
          "hover:border-primary/40",
          "hover:bg-card/50",
        ],
        glass: [
          "border-white/20",
          "bg-white/10 backdrop-blur-xl",
          "shadow-2xl shadow-black/10",
          "dark:bg-black/10",
          "hover:bg-white/20 dark:hover:bg-white/15",
        ],
      },
      disabled: {
        true: ["opacity-50", "cursor-not-allowed", "pointer-events-none"],
        false: [],
      },
    },
    defaultVariants: {
      variant: "default",
      disabled: false,
    },
  }
);

/**
 * CollapsibleTrigger styles
 */
export const collapsibleTriggerVariants = cva(
  [
    "flex items-center justify-between",
    "w-full",
    "px-4 py-3",
    "text-left",
    "font-medium",
    "transition-all duration-200",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-ring",
    "focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
    "group",
  ],
  {
    variants: {
      variant: {
        default: [
          "text-foreground",
          "hover:bg-accent/10",
          "active:bg-accent/20",
        ],
        primary: [
          "text-primary",
          "hover:bg-primary/10",
          "active:bg-primary/20",
        ],
        secondary: [
          "text-secondary",
          "hover:bg-secondary/10",
          "active:bg-secondary/20",
        ],
        accent: [
          "text-accent-foreground",
          "hover:bg-accent/20",
          "active:bg-accent/30",
        ],
        success: [
          "text-success",
          "hover:bg-success/10",
          "active:bg-success/20",
        ],
        warning: [
          "text-warning",
          "hover:bg-warning/10",
          "active:bg-warning/20",
        ],
        error: [
          "text-destructive",
          "hover:bg-destructive/10",
          "active:bg-destructive/20",
        ],
        info: [
          "text-blue-600 dark:text-blue-400",
          "hover:bg-blue-500/10",
          "active:bg-blue-500/20",
        ],
        outline: [
          "text-foreground",
          "hover:bg-accent/5",
          "active:bg-accent/10",
        ],
        glass: [
          "text-gray-900 dark:text-white",
          "hover:bg-white/10 dark:hover:bg-black/10",
          "active:bg-white/20 dark:active:bg-black/20",
        ],
      },
      open: {
        true: [],
        false: [],
      },
    },
    defaultVariants: {
      variant: "default",
      open: false,
    },
  }
);

/**
 * CollapsibleContent styles
 */
export const collapsibleContentVariants = cva(["overflow-hidden"], {
  variants: {
    variant: {
      default: ["bg-card"],
      primary: ["bg-primary/5"],
      secondary: ["bg-secondary/5"],
      accent: ["bg-accent/5"],
      success: ["bg-success/5"],
      warning: ["bg-warning/5"],
      error: ["bg-destructive/5"],
      info: ["bg-blue-500/5"],
      outline: ["bg-transparent"],
      glass: ["bg-white/5 dark:bg-black/5"],
    },
    animation: {
      smooth: ["ease-in-out"],
      spring: ["ease-out"],
      bounce: [],
      none: [],
    },
  },
  defaultVariants: {
    variant: "default",
    animation: "smooth",
  },
});

/**
 * CollapsibleIcon styles
 */
export const collapsibleIconVariants = cva(
  ["transition-all duration-300 ease-in-out", "shrink-0"],
  {
    variants: {
      open: {
        true: [],
        false: [],
      },
      variant: {
        default: "text-muted-foreground group-hover:text-foreground",
        primary: "text-primary",
        secondary: "text-secondary",
        accent: "text-accent-foreground",
        success: "text-success",
        warning: "text-warning",
        error: "text-destructive",
        info: "text-blue-600 dark:text-blue-400",
        outline: "text-muted-foreground group-hover:text-foreground",
        glass: "text-gray-700 dark:text-gray-300",
      },
    },
    defaultVariants: {
      open: false,
      variant: "default",
    },
  }
);
