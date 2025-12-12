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
  }
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
  }
);

/**
 * Input field variants using CVA with standard variants (matching InputOTP style)
 */
const inputVariants = cva(
  "w-full font-medium transition-all duration-200 focus:outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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
        xs: "h-7 px-2 text-xs gap-1.5 rounded-md",
        sm: "h-9 px-3 text-sm gap-2 rounded-lg",
        md: "h-11 px-4 text-base gap-2.5 rounded-xl",
        lg: "h-13 px-5 text-lg gap-3 rounded-xl",
        xl: "h-16 px-6 text-xl gap-3.5 rounded-2xl",
        "2xl": "h-20 px-7 text-2xl gap-4 rounded-3xl",
        "3xl": "h-24 px-8 text-3xl gap-5 rounded-3xl",
        "4xl": "h-28 px-10 text-4xl gap-6 rounded-3xl",
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
      variant: "default",
      size: "md",
      hasStartIcon: false,
      hasEndIcon: false,
    },
  }
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
        xs: "w-3 h-3",
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
        xl: "w-7 h-7",
        "2xl": "w-8 h-8",
        "3xl": "w-10 h-10",
        "4xl": "w-12 h-12",
      },
    },
    compoundVariants: [
      {
        position: "start",
        size: "xs",
        className: "left-2",
      },
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
        position: "start",
        size: "2xl",
        className: "left-6",
      },
      {
        position: "start",
        size: "3xl",
        className: "left-7",
      },
      {
        position: "start",
        size: "4xl",
        className: "left-8",
      },
      {
        position: "end",
        size: "xs",
        className: "right-2",
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
      {
        position: "end",
        size: "2xl",
        className: "right-6",
      },
      {
        position: "end",
        size: "3xl",
        className: "right-7",
      },
      {
        position: "end",
        size: "4xl",
        className: "right-8",
      },
    ],
    defaultVariants: {
      position: "start",
      size: "md",
    },
  }
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
