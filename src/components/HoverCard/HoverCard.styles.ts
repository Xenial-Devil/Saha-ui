import { cva } from "class-variance-authority";

/**
 * HoverCard content variants
 */
export const hoverCardContentVariants = cva(
  "rounded-lg border shadow-lg backdrop-blur-sm transition-all duration-200 z-50",
  {
    variants: {
      variant: {
        default: "bg-background/95 border-border text-foreground",
        primary:
          "bg-primary/95 border-primary/20 text-primary-foreground shadow-primary/20",
        secondary:
          "bg-secondary/95 border-secondary/20 text-secondary-foreground shadow-secondary/20",
        accent:
          "bg-accent/95 border-accent/20 text-accent-foreground shadow-accent/20",
        success:
          "bg-success/95 border-success/20 text-success-foreground shadow-success/20",
        warning:
          "bg-warning/95 border-warning/20 text-warning-foreground shadow-warning/20",
        error:
          "bg-error/95 border-error/20 text-error-foreground shadow-error/20",
        info: "bg-info/95 border-info/20 text-info-foreground shadow-info/20",
        outline: "bg-background/95 border-foreground/20 text-foreground",
        glass:
          "bg-background/20 border-white/10 text-foreground backdrop-blur-xl shadow-xl",
      },
      size: {
        sm: "p-2 text-sm max-w-xs",
        md: "p-4 text-base max-w-sm",
        lg: "p-6 text-base max-w-md",
        xl: "p-8 text-lg max-w-lg",
      },
      animation: {
        fade: "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        scale:
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        slide:
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      animation: "fade",
    },
  }
);

/**
 * HoverCard arrow variants
 */
export const hoverCardArrowVariants = cva("fill-current", {
  variants: {
    variant: {
      default: "text-background",
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
      success: "text-success",
      warning: "text-warning",
      error: "text-error",
      info: "text-info",
      outline: "text-background",
      glass: "text-background/20",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/**
 * HoverCard trigger variants
 */
export const hoverCardTriggerVariants = cva(
  "inline-flex cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded",
  {
    variants: {},
    defaultVariants: {},
  }
);
