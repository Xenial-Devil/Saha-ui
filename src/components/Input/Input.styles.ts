import { cva } from "class-variance-authority";
/**
 * Input container variants
 */
const inputContainerVariants = cva("relative flex flex-col gap-1.5", {
  variants: {
    fullWidth: {
      true: "w-full",
      false: "w-auto",
    },
  },
  defaultVariants: {
    fullWidth: false,
  },
});

/**
 * Input label variants
 */
const inputLabelVariants = cva(
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
  },
);

/**
 * Input wrapper variants
 */
const inputWrapperVariants = cva(
  "relative flex items-center transition-all duration-200",
  {
    variants: {
      fullWidth: {
        true: "w-full",
        false: "w-auto min-w-[200px]",
      },
    },
    defaultVariants: {
      fullWidth: false,
    },
  },
);

/**
 * Input field variants using CVA with standard variants
 */
const inputVariants = cva(
  "w-full font-medium transition-all duration-300 focus:outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 relative before:absolute before:inset-0 before:rounded-[inherit] before:transition-opacity before:duration-300 before:opacity-0 focus:before:opacity-100 after:absolute after:inset-0 after:rounded-[inherit] after:transition-all after:duration-300",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/90 hover:scale-[1.01] focus:ring-4 focus:ring-primary/30 hover:shadow-lg hover:shadow-primary/30 focus:shadow-xl focus:shadow-primary/40 focus:scale-[1.02] before:bg-gradient-to-r before:from-primary-foreground/10 before:via-transparent before:to-primary-foreground/10 after:bg-gradient-to-t after:from-black/10 after:to-transparent after:pointer-events-none",
        secondary:
          "bg-secondary text-secondary-foreground border-2 border-secondary hover:bg-secondary/80 hover:scale-[1.01] focus:ring-4 focus:ring-secondary/30 hover:shadow-lg hover:shadow-secondary/30 focus:shadow-xl focus:shadow-secondary/40 focus:scale-[1.02] before:bg-gradient-to-r before:from-secondary-foreground/10 before:via-transparent before:to-secondary-foreground/10 after:bg-gradient-to-t after:from-black/10 after:to-transparent after:pointer-events-none",
        accent:
          "bg-accent text-accent-foreground border-2 border-accent hover:bg-accent/90 hover:scale-[1.01] focus:ring-4 focus:ring-accent/30 hover:shadow-lg hover:shadow-accent/30 focus:shadow-xl focus:shadow-accent/40 focus:scale-[1.02] before:bg-gradient-to-r before:from-accent-foreground/10 before:via-transparent before:to-accent-foreground/10 after:bg-gradient-to-t after:from-black/10 after:to-transparent after:pointer-events-none",
        info: "bg-info/10 text-info border-2 border-info hover:bg-info/20 hover:scale-[1.01] hover:border-info/80 focus:border-info focus:ring-4 focus:ring-info/30 hover:shadow-lg hover:shadow-info/30 focus:shadow-xl focus:shadow-info/40 focus:scale-[1.02] before:bg-gradient-to-r before:from-info/20 before:via-transparent before:to-info/20 backdrop-blur-sm after:bg-gradient-to-t after:from-info/5 after:to-transparent after:pointer-events-none",
        success:
          "bg-success/10 text-success border-2 border-success hover:bg-success/20 hover:scale-[1.01] hover:border-success/80 focus:border-success focus:ring-4 focus:ring-success/30 hover:shadow-lg hover:shadow-success/30 focus:shadow-xl focus:shadow-success/40 focus:scale-[1.02] before:bg-gradient-to-r before:from-success/20 before:via-transparent before:to-success/20 backdrop-blur-sm after:bg-gradient-to-t after:from-success/5 after:to-transparent after:pointer-events-none",
        warning:
          "bg-warning/10 text-warning border-2 border-warning hover:bg-warning/20 hover:scale-[1.01] hover:border-warning/80 focus:border-warning focus:ring-4 focus:ring-warning/30 hover:shadow-lg hover:shadow-warning/30 focus:shadow-xl focus:shadow-warning/40 focus:scale-[1.02] before:bg-gradient-to-r before:from-warning/20 before:via-transparent before:to-warning/20 backdrop-blur-sm after:bg-gradient-to-t after:from-warning/5 after:to-transparent after:pointer-events-none",
        error:
          "bg-destructive/10 text-destructive border-2 border-destructive hover:bg-destructive/20 hover:scale-[1.01] hover:border-destructive/80 focus:border-destructive focus:ring-4 focus:ring-destructive/30 hover:shadow-lg hover:shadow-destructive/30 focus:shadow-xl focus:shadow-destructive/40 focus:scale-[1.02] before:bg-gradient-to-r before:from-destructive/20 before:via-transparent before:to-destructive/20 backdrop-blur-sm after:bg-gradient-to-t after:from-destructive/5 after:to-transparent after:pointer-events-none",
        outline:
          "bg-card/50 backdrop-blur-sm border-2 border-border focus:border-primary hover:border-primary/60 hover:scale-[1.01] shadow-sm focus:shadow-xl hover:shadow-lg focus:ring-4 focus:ring-primary/20 focus:scale-[1.02] before:bg-gradient-to-r before:from-primary/10 before:via-transparent before:to-primary/10 after:bg-gradient-to-br after:from-background/50 after:to-transparent after:pointer-events-none",
        ghost:
          "bg-transparent border-2 border-transparent hover:bg-accent/10 hover:scale-[1.01] focus:bg-accent/10 focus:border-accent/30 focus:scale-[1.02] focus:shadow-lg focus:shadow-accent/20 before:bg-gradient-to-r before:from-accent/10 before:via-transparent before:to-accent/10",
        glass:
          "bg-white/10 dark:bg-black/10 backdrop-blur-xl border-2 border-white/20 focus:border-primary/40 hover:border-white/30 hover:scale-[1.01] shadow-2xl shadow-black/10 hover:shadow-2xl hover:shadow-primary/20 focus:shadow-2xl focus:shadow-primary/25 focus:scale-[1.02] before:bg-gradient-to-r before:from-white/10 before:via-transparent before:to-white/10 after:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_50%)] after:opacity-0 focus:after:opacity-100 after:transition-opacity after:duration-700 after:pointer-events-none",
      },
      size: {
        sm: "h-9 px-3 text-sm gap-2 rounded-lg",
        md: "h-11 px-4 text-base gap-2.5 rounded-xl",
        lg: "h-13 px-5 text-lg gap-3 rounded-xl",
        xl: "h-16 px-6 text-xl gap-4 rounded-2xl",
      },
      hasStartIcon: {
        true: "",
        false: "",
      },
      hasEndIcon: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        size: "sm",
        hasStartIcon: true,
        className: "pl-9",
      },
      {
        size: "md",
        hasStartIcon: true,
        className: "pl-11",
      },
      {
        size: "lg",
        hasStartIcon: true,
        className: "pl-12",
      },
      {
        size: "xl",
        hasStartIcon: true,
        className: "pl-14",
      },
      {
        size: "sm",
        hasEndIcon: true,
        className: "pr-9",
      },
      {
        size: "md",
        hasEndIcon: true,
        className: "pr-11",
      },
      {
        size: "lg",
        hasEndIcon: true,
        className: "pr-12",
      },
      {
        size: "xl",
        hasEndIcon: true,
        className: "pr-14",
      },
    ],
    defaultVariants: {
      variant: "outline",
      size: "md",
      hasStartIcon: false,
      hasEndIcon: false,
    },
  },
);

/**
 * Input icon variants
 */
const inputIconVariants = cva(
  "absolute top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200",
  {
    variants: {
      position: {
        start: "",
        end: "",
      },
      size: {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
        xl: "w-7 h-7",
      },
    },
    compoundVariants: [
      {
        position: "start",
        size: "sm",
        className: "left-3",
      },
      {
        position: "start",
        size: "md",
        className: "left-3.5",
      },
      {
        position: "start",
        size: "lg",
        className: "left-4",
      },
      {
        position: "start",
        size: "xl",
        className: "left-5",
      },
      {
        position: "end",
        size: "sm",
        className: "right-3",
      },
      {
        position: "end",
        size: "md",
        className: "right-3.5",
      },
      {
        position: "end",
        size: "lg",
        className: "right-4",
      },
      {
        position: "end",
        size: "xl",
        className: "right-5",
      },
    ],
    defaultVariants: {
      position: "start",
      size: "md",
    },
  },
);

/**
 * Helper text variants
 */
const helperTextVariants = cva("text-xs transition-colors duration-200", {
  variants: {
    error: {
      true: "text-destructive",
      false: "text-muted-foreground",
    },
  },
  defaultVariants: {
    error: false,
  },
});

export {
  inputContainerVariants,
  inputLabelVariants,
  inputWrapperVariants,
  inputVariants,
  inputIconVariants,
  helperTextVariants,
};