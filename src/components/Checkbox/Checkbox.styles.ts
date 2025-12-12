import { cva } from "class-variance-authority";
/**
 * Checkbox variants using CVA
 */
const checkboxVariants = cva(
  [
    "peer relative appearance-none shrink-0 rounded-md border-2",
    "transition-all duration-300 ease-out cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    // Hover effects
    "hover:scale-110 active:scale-95",
    // Shadow effects
    "shadow-sm hover:shadow-md checked:shadow-lg",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-border bg-background",
          "checked:border-foreground checked:bg-foreground",
          "indeterminate:border-foreground indeterminate:bg-foreground",
          "focus-visible:ring-ring/50",
          "hover:border-foreground/60",
        ],
        primary: [
          "border-primary/40 bg-primary/5",
          "checked:border-primary checked:bg-primary",
          "indeterminate:border-primary indeterminate:bg-primary",
          "focus-visible:ring-primary/50",
          "hover:border-primary/60",
          "checked:shadow-primary/40",
        ],
        secondary: [
          "border-secondary/40 bg-secondary/5",
          "checked:border-secondary checked:bg-secondary",
          "indeterminate:border-secondary indeterminate:bg-secondary",
          "focus-visible:ring-secondary/50",
          "hover:border-secondary/60",
          "checked:shadow-secondary/40",
        ],
        accent: [
          "border-accent/40 bg-accent/5",
          "checked:border-accent checked:bg-accent",
          "indeterminate:border-accent indeterminate:bg-accent",
          "focus-visible:ring-accent/50",
          "hover:border-accent/60",
          "checked:shadow-accent/40",
        ],
        success: [
          "border-success/40 bg-success/5",
          "checked:border-success checked:bg-success",
          "indeterminate:border-success indeterminate:bg-success",
          "focus-visible:ring-success/50",
          "hover:border-success/60",
          "checked:shadow-success/40",
        ],
        warning: [
          "border-warning/40 bg-warning/5",
          "checked:border-warning checked:bg-warning",
          "indeterminate:border-warning indeterminate:bg-warning",
          "focus-visible:ring-warning/50",
          "hover:border-warning/60",
          "checked:shadow-warning/40",
        ],
        error: [
          "border-destructive/40 bg-destructive/5",
          "checked:border-destructive checked:bg-destructive",
          "indeterminate:border-destructive indeterminate:bg-destructive",
          "focus-visible:ring-destructive/50",
          "hover:border-destructive/60",
          "checked:shadow-destructive/40",
        ],
        glass: [
          "border-white/20 bg-white/10 backdrop-blur-xl",
          "dark:bg-black/10",
          "checked:border-white/30 checked:bg-white/20",
          "indeterminate:border-white/30 indeterminate:bg-white/20",
          "focus-visible:ring-white/50",
          "hover:border-white/30",
          "checked:shadow-black/10",
        ],
      },
      size: {
        xs: "h-3 w-3",
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
        xl: "h-7 w-7",
        "2xl": "h-8 w-8",
        "3xl": "h-10 w-10",
        "4xl": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

/**
 * Checkbox label wrapper variants
 */
const checkboxLabelVariants = cva(
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
      card: {
        true: [
          "flex-col p-4 rounded-xl border-2 border-border bg-card",
          "hover:border-primary hover:shadow-lg hover:scale-[1.02]",
          "transition-all duration-300",
          "relative overflow-hidden",
          "has-[:checked]:border-primary has-[:checked]:bg-primary/5",
          "has-[:checked]:shadow-lg has-[:checked]:shadow-primary/20",
        ],
        false: "",
      },
    },
    defaultVariants: {
      disabled: false,
      card: false,
    },
  }
);

/**
 * Checkbox text variants
 */
const checkboxTextVariants = cva(
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
 * Checkbox description variants
 */
const checkboxDescriptionVariants = cva(
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
  checkboxVariants,
  checkboxLabelVariants,
  checkboxTextVariants,
  checkboxDescriptionVariants,
};
