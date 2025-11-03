import { cva } from "class-variance-authority";
/**
 * Tag variants using CVA
 */
const tagVariants = cva(
  [
    "inline-flex items-center gap-2 font-medium select-none",
    "transition-all duration-300 ease-out",
    "border-2",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-border bg-muted text-foreground",
          "hover:bg-muted/80",
        ],
        primary: [
          "border-primary/40 bg-primary/10 text-primary",
          "hover:bg-primary/20",
          "dark:bg-primary/20 dark:hover:bg-primary/30",
        ],
        secondary: [
          "border-secondary/40 bg-secondary/10 text-secondary",
          "hover:bg-secondary/20",
          "dark:bg-secondary/20 dark:hover:bg-secondary/30",
        ],
        accent: [
          "border-accent/40 bg-accent/10 text-accent",
          "hover:bg-accent/20",
          "dark:bg-accent/20 dark:hover:bg-accent/30",
        ],
        success: [
          "border-success/40 bg-success/10 text-success",
          "hover:bg-success/20",
          "dark:bg-success/20 dark:hover:bg-success/30",
        ],
        warning: [
          "border-warning/40 bg-warning/10 text-warning",
          "hover:bg-warning/20",
          "dark:bg-warning/20 dark:hover:bg-warning/30",
        ],
        error: [
          "border-destructive/40 bg-destructive/10 text-destructive",
          "hover:bg-destructive/20",
          "dark:bg-destructive/20 dark:hover:bg-destructive/30",
        ],
        info: [
          "border-info/40 bg-info/10 text-info",
          "hover:bg-info/20",
          "dark:bg-info/20 dark:hover:bg-info/30",
        ],
        outline: [
          "border-border bg-transparent text-foreground",
          "hover:bg-muted/50",
        ],
        ghost: [
          "border-transparent bg-transparent text-foreground",
          "hover:bg-muted/50",
        ],
        glass: [
          "border-border/50 glass text-foreground",
          "hover:border-border",
        ],
      },
      size: {
        sm: "px-2 py-0.5 text-xs gap-1",
        md: "px-3 py-1 text-sm gap-1.5",
        lg: "px-4 py-1.5 text-base gap-2",
      },
      rounded: {
        default: "rounded-lg",
        full: "rounded-full",
        none: "rounded-none",
      },
      clickable: {
        true: "cursor-pointer hover:scale-105 active:scale-95",
        false: "",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none",
        false: "",
      },
      selected: {
        true: "ring-2 ring-offset-2 ring-primary",
        false: "",
      },
      animated: {
        true: "animate-in fade-in-0 zoom-in-95 duration-300",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "default",
      clickable: false,
      disabled: false,
      selected: false,
      animated: false,
    },
  }
);

/**
 * Badge variants for tags
 */
const badgeVariants = cva(
  [
    "flex items-center justify-center min-w-[1.25rem] h-5 px-1.5",
    "text-xs font-bold rounded-full",
    "transition-colors duration-200",
  ],
  {
    variants: {
      variant: {
        default: "bg-muted-foreground text-background",
        primary: "bg-primary text-primary-foreground",
        success: "bg-success text-success-foreground",
        warning: "bg-warning text-warning-foreground",
        error: "bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
export { tagVariants, badgeVariants };