import { cva } from "class-variance-authority";
/**
 * Switch track (background) variants using CVA
 */
const switchVariants = cva(
  [
    "relative inline-flex shrink-0 cursor-pointer rounded-full",
    "transition-all duration-300 ease-out",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "border-2",
    // Shadow effects
    "shadow-inner hover:shadow-md",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-border bg-muted",
          "data-[state=checked]:bg-foreground data-[state=checked]:border-foreground",
          "focus-visible:ring-ring/50",
        ],
        primary: [
          "border-primary/40 bg-primary/10",
          "data-[state=checked]:bg-primary data-[state=checked]:border-primary",
          "focus-visible:ring-primary/50",
          "data-[state=checked]:shadow-lg data-[state=checked]:shadow-primary/40",
        ],
        secondary: [
          "border-secondary/40 bg-secondary/10",
          "data-[state=checked]:bg-secondary data-[state=checked]:border-secondary",
          "focus-visible:ring-secondary/50",
          "data-[state=checked]:shadow-lg data-[state=checked]:shadow-secondary/40",
        ],
        accent: [
          "border-accent/40 bg-accent/10",
          "data-[state=checked]:bg-accent data-[state=checked]:border-accent",
          "focus-visible:ring-accent/50",
          "data-[state=checked]:shadow-lg data-[state=checked]:shadow-accent/40",
        ],
        success: [
          "border-success/40 bg-success/10",
          "data-[state=checked]:bg-success data-[state=checked]:border-success",
          "focus-visible:ring-success/50",
          "data-[state=checked]:shadow-lg data-[state=checked]:shadow-success/40",
        ],
        warning: [
          "border-warning/40 bg-warning/10",
          "data-[state=checked]:bg-warning data-[state=checked]:border-warning",
          "focus-visible:ring-warning/50",
          "data-[state=checked]:shadow-lg data-[state=checked]:shadow-warning/40",
        ],
        error: [
          "border-destructive/40 bg-destructive/10",
          "data-[state=checked]:bg-destructive data-[state=checked]:border-destructive",
          "focus-visible:ring-destructive/50",
          "data-[state=checked]:shadow-lg data-[state=checked]:shadow-destructive/40",
        ],
        glass: [
          "border-white/20 bg-white/10 backdrop-blur-xl",
          "dark:bg-black/10",
          "data-[state=checked]:bg-white/20 data-[state=checked]:border-white/30",
          "dark:data-[state=checked]:bg-black/20",
          "focus-visible:ring-white/50",
          "data-[state=checked]:shadow-lg data-[state=checked]:shadow-black/10",
        ],
      },
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-14",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

/**
 * Switch thumb (the moving circle) variants
 */
const switchThumbVariants = cva(
  [
    "pointer-events-none block rounded-full bg-white shadow-lg",
    "transition-all duration-300 ease-out",
    "flex items-center justify-center",
    "data-[state=checked]:translate-x-full",
  ],
  {
    variants: {
      size: {
        sm: "h-4 w-4 text-[10px] data-[state=checked]:translate-x-4",
        md: "h-5 w-5 text-xs data-[state=checked]:translate-x-5",
        lg: "h-6 w-6 text-sm data-[state=checked]:translate-x-7",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/**
 * Switch label wrapper variants
 */
const switchLabelVariants = cva(
  [
    "inline-flex items-center gap-3 cursor-pointer select-none",
    "transition-all duration-300",
    "group",
  ],
  {
    variants: {
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

/**
 * Switch text variants
 */
const switchTextVariants = cva(
  ["font-medium transition-colors duration-300", "group-hover:text-foreground"],
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
      disabled: {
        true: "text-muted-foreground",
        false: "text-foreground",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
    },
  }
);

/**
 * Switch description variants
 */
const switchDescriptionVariants = cva(
  ["text-sm text-muted-foreground transition-colors duration-300"],
  {
    variants: {
      disabled: {
        true: "opacity-70",
        false: "",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);
export {
  switchVariants,
  switchThumbVariants,
  switchLabelVariants,
  switchTextVariants,
  switchDescriptionVariants,
};