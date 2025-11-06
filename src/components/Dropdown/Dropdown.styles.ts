import { cva } from "class-variance-authority";
/**
 * Dropdown trigger button variants
 */
const dropdownTriggerVariants = cva(
  [
    "inline-flex items-center justify-between gap-2 rounded-lg border-2",
    "font-medium transition-all duration-300 ease-out cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "hover:scale-[1.02] active:scale-[0.98]",
    "shadow-sm hover:shadow-md",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-border bg-background text-foreground",
          "hover:border-foreground/60 hover:bg-muted/50",
          "focus-visible:ring-ring/50",
        ],
        primary: [
          "border-primary/40 bg-primary/5 text-primary",
          "hover:border-primary/60 hover:bg-primary/10",
          "focus-visible:ring-primary/50",
        ],
        secondary: [
          "border-secondary/40 bg-secondary/5 text-secondary",
          "hover:border-secondary/60 hover:bg-secondary/10",
          "focus-visible:ring-secondary/50",
        ],
        accent: [
          "border-accent/40 bg-accent/5 text-accent",
          "hover:border-accent/60 hover:bg-accent/10",
          "focus-visible:ring-accent/50",
        ],
        success: [
          "border-success/40 bg-success/5 text-success",
          "hover:border-success/60 hover:bg-success/10",
          "focus-visible:ring-success/50",
        ],
        warning: [
          "border-warning/40 bg-warning/5 text-warning",
          "hover:border-warning/60 hover:bg-warning/10",
          "focus-visible:ring-warning/50",
        ],
        error: [
          "border-destructive/40 bg-destructive/5 text-destructive",
          "hover:border-destructive/60 hover:bg-destructive/10",
          "focus-visible:ring-destructive/50",
        ],
        ghost: [
          "border-transparent bg-transparent text-foreground",
          "hover:bg-muted/50",
          "focus-visible:ring-ring/50",
        ],
        glass: [
          "bg-white/10 dark:bg-black/10 backdrop-blur-xl border-white/20 text-foreground",
          "hover:border-white/30 shadow-2xl shadow-black/10",
          "focus-visible:ring-ring/50",
        ],
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-5 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

/**
 * Dropdown content variants
 */
const dropdownContentVariants = cva(
  [
    "z-50 rounded-xl border-2 shadow-xl text-foreground",
    "transition-all duration-300 ease-out",
    "animate-in fade-in-0 zoom-in-95",
    "overflow-hidden",
  ],
  {
    variants: {
      variant: {
        default: "border-border bg-background",
        primary: "border-primary/40 bg-background",
        secondary: "border-secondary/40 bg-background",
        accent: "border-accent/40 bg-background",
        success: "border-success/40 bg-background",
        warning: "border-warning/40 bg-background",
        error: "border-destructive/40 bg-background",
        ghost: "border-border bg-background",
        glass:
          "bg-white/10 dark:bg-black/10 backdrop-blur-xl border-white/20 shadow-2xl shadow-black/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/**
 * Dropdown item variants
 */
const dropdownItemVariants = cva(
  [
    "flex items-center gap-3 px-4 py-2.5 cursor-pointer",
    "transition-all duration-200 ease-out",
    "focus-visible:outline-none",
    "data-[disabled=true]:opacity-50 data-[disabled=true]:!cursor-not-allowed data-[disabled=true]:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        default: [
          "text-foreground hover:bg-foreground/5",
          "data-[selected=true]:bg-foreground/10 data-[selected=true]:font-medium",
        ],
        primary: [
          "text-foreground hover:bg-primary/5",
          "data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary data-[selected=true]:font-medium",
        ],
        secondary: [
          "text-foreground hover:bg-secondary/5",
          "data-[selected=true]:bg-secondary/10 data-[selected=true]:text-secondary data-[selected=true]:font-medium",
        ],
        accent: [
          "text-foreground hover:bg-accent/5",
          "data-[selected=true]:bg-accent/10 data-[selected=true]:text-accent data-[selected=true]:font-medium",
        ],
        success: [
          "text-foreground hover:bg-success/5",
          "data-[selected=true]:bg-success/10 data-[selected=true]:text-success data-[selected=true]:font-medium",
        ],
        warning: [
          "text-foreground hover:bg-warning/5",
          "data-[selected=true]:bg-warning/10 data-[selected=true]:text-warning data-[selected=true]:font-medium",
        ],
        error: [
          "text-foreground hover:bg-destructive/5",
          "data-[selected=true]:bg-destructive/10 data-[selected=true]:text-destructive data-[selected=true]:font-medium",
        ],
        ghost: [
          "text-foreground hover:bg-foreground/5",
          "data-[selected=true]:bg-foreground/10 data-[selected=true]:font-medium",
        ],
        glass: [
          "text-foreground hover:bg-white/10 dark:hover:bg-black/10",
          "data-[selected=true]:bg-white/20 dark:data-[selected=true]:bg-black/20 data-[selected=true]:font-medium",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
export {
  dropdownTriggerVariants,
  dropdownContentVariants,
  dropdownItemVariants,
};
