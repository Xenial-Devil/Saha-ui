import { cva } from "class-variance-authority";

/**
 * Container variants for the OTP input wrapper
 */
export const otpContainerVariants = cva("relative flex flex-col gap-1.5", {
  variants: {},
  defaultVariants: {},
});

/**
 * Label variants for the OTP input
 */
export const otpLabelVariants = cva(
  "text-sm font-medium transition-colors duration-200",
  {
    variants: {
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

/**
 * Group wrapper variants for OTP slots
 */
export const otpGroupVariants = cva("flex items-center gap-2", {
  variants: {
    size: {
      xs: "gap-1",
      sm: "gap-1.5",
      md: "gap-2",
      lg: "gap-2.5",
      xl: "gap-3",
      "2xl": "gap-3.5",
      "3xl": "gap-4",
      "4xl": "gap-5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

/**
 * Individual OTP slot variants
 */
export const otpSlotVariants = cva(
  "flex items-center justify-center font-bold text-center transition-all duration-200 focus:outline-none focus:z-10 disabled:cursor-not-allowed disabled:opacity-50 caret-transparent select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary/10 text-primary border-2 border-primary/30 hover:border-primary hover:bg-primary/20 focus:border-primary focus:bg-primary/20 focus:ring-2 focus:ring-primary/30",
        secondary:
          "bg-secondary/10 text-secondary border-2 border-secondary/30 hover:border-secondary hover:bg-secondary/20 focus:border-secondary focus:bg-secondary/20 focus:ring-2 focus:ring-secondary/30",
        accent:
          "bg-accent/10 text-accent border-2 border-accent/30 hover:border-accent hover:bg-accent/20 focus:border-accent focus:bg-accent/20 focus:ring-2 focus:ring-accent/30",
        info: "bg-info/5 text-info border-2 border-info/30 hover:border-info hover:bg-info/10 focus:border-info focus:bg-info/10 focus:ring-2 focus:ring-info/20",
        success:
          "bg-success/5 text-success border-2 border-success/30 hover:border-success hover:bg-success/10 focus:border-success focus:bg-success/10 focus:ring-2 focus:ring-success/20",
        warning:
          "bg-warning/5 text-warning border-2 border-warning/30 hover:border-warning hover:bg-warning/10 focus:border-warning focus:bg-warning/10 focus:ring-2 focus:ring-warning/20",
        error:
          "bg-destructive/5 text-destructive border-2 border-destructive/30 hover:border-destructive hover:bg-destructive/10 focus:border-destructive focus:bg-destructive/10 focus:ring-2 focus:ring-destructive/20",
        outline:
          "bg-background border-2 border-border hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20",
        ghost:
          "bg-muted/30 border-2 border-transparent hover:bg-muted/50 hover:border-muted focus:bg-muted/50 focus:border-muted/80 focus:ring-2 focus:ring-muted/20",
        glass:
          "bg-background/30 backdrop-blur-sm border-2 border-white/20 dark:border-white/10 hover:border-white/30 dark:hover:border-white/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20",
      },
      size: {
        sm: "w-9 h-9 text-sm rounded-lg",
        md: "w-12 h-12 text-lg rounded-xl",
        lg: "w-14 h-14 text-xl rounded-xl",
        xl: "w-16 h-16 text-2xl rounded-2xl",
      },
      hasValue: {
        true: "",
        false: "",
      },
      isActive: {
        true: "ring-4",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        isActive: true,
        className: "ring-primary/30",
      },
      {
        variant: "secondary",
        isActive: true,
        className: "ring-secondary/30",
      },
      {
        variant: "accent",
        isActive: true,
        className: "ring-accent/30",
      },
      {
        variant: "info",
        isActive: true,
        className: "ring-info/30",
      },
      {
        variant: "success",
        isActive: true,
        className: "ring-success/30",
      },
      {
        variant: "warning",
        isActive: true,
        className: "ring-warning/30",
      },
      {
        variant: "error",
        isActive: true,
        className: "ring-destructive/30",
      },
      {
        variant: "outline",
        isActive: true,
        className: "ring-primary/20",
      },
      {
        variant: "ghost",
        isActive: true,
        className: "ring-accent/20",
      },
      {
        variant: "glass",
        isActive: true,
        className: "ring-primary/30",
      },
    ],
    defaultVariants: {
      variant: "outline",
      size: "md",
      hasValue: false,
      isActive: false,
    },
  }
);

/**
 * Separator variants for OTP groups
 */
export const otpSeparatorVariants = cva(
  "flex items-center justify-center text-muted-foreground select-none",
  {
    variants: {
      size: {
        xs: "text-xs mx-0.5",
        sm: "text-sm mx-1",
        md: "text-base mx-1.5",
        lg: "text-lg mx-2",
        xl: "text-xl mx-2.5",
        "2xl": "text-2xl mx-3",
        "3xl": "text-3xl mx-3.5",
        "4xl": "text-4xl mx-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/**
 * Helper text variants
 */
export const otpHelperTextVariants = cva(
  "text-sm transition-colors duration-200",
  {
    variants: {
      error: {
        true: "text-destructive",
        false: "text-muted-foreground",
      },
    },
    defaultVariants: {
      error: false,
    },
  }
);
