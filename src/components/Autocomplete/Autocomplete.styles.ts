import { cva } from "class-variance-authority";
const containerVariants = cva("relative w-full", {
  variants: {
    disabled: {
      true: "opacity-50 cursor-not-allowed",
      false: "",
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

const inputWrapperVariants = cva(
  "relative flex items-center gap-2 transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-background border border-border rounded-lg",
        filled: "bg-muted border border-transparent rounded-lg",
        outlined: "bg-transparent border-2 border-border rounded-lg",
        ghost:
          "bg-transparent border border-transparent rounded-lg hover:bg-muted/50",
        glass:
          "bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl shadow-black/10",
        primary: "bg-primary/10 border border-primary rounded-lg",
        success: "bg-success/10 border border-success rounded-lg",
        warning: "bg-warning/10 border border-warning rounded-lg",
        error: "bg-danger/10 border border-danger rounded-lg",
      },
      size: {
        sm: "h-8 px-2 text-sm",
        md: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base",
      },
      focused: {
        true: "",
        false: "",
      },
      error: {
        true: "border-danger focus-within:border-danger focus-within:ring-2 focus-within:ring-danger/20",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        focused: true,
        error: false,
        className: "border-primary ring-2 ring-primary/20",
      },
      {
        variant: "filled",
        focused: true,
        error: false,
        className: "bg-muted border-primary ring-2 ring-primary/20",
      },
      {
        variant: "outlined",
        focused: true,
        error: false,
        className: "border-primary ring-2 ring-primary/20",
      },
      {
        variant: "glass",
        focused: true,
        error: false,
        className: "border-white/30 ring-2 ring-primary/20",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      focused: false,
      error: false,
    },
  },
);

const inputVariants = cva(
  "flex-1 bg-transparent outline-none placeholder:text-muted-foreground",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-sm",
        lg: "text-base",
      },
      disabled: {
        true: "cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
    },
  },
);

const dropdownVariants = cva(
  "absolute z-50 w-full mt-1 bg-card border border-border rounded-lg shadow-2xl overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-card",
        filled: "bg-card",
        outlined: "bg-card",
        ghost: "bg-card",
        glass:
          "bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/10",
        primary: "bg-card",
        success: "bg-card",
        warning: "bg-card",
        error: "bg-card",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const optionVariants = cva(
  "flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors duration-150",
  {
    variants: {
      size: {
        sm: "px-2 py-1.5 text-xs",
        md: "px-3 py-2 text-sm",
        lg: "px-4 py-2.5 text-base",
      },
      highlighted: {
        true: "bg-primary/10 text-primary",
        false: "text-foreground hover:bg-muted",
      },
      selected: {
        true: "font-medium",
        false: "",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed hover:bg-transparent",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      highlighted: false,
      selected: false,
      disabled: false,
    },
  },
);

const labelVariants = cva("block mb-1.5 font-medium text-foreground", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
    required: {
      true: "after:content-['*'] after:ml-1 after:text-danger",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    required: false,
  },
});
export {
  containerVariants,
  inputWrapperVariants,
  inputVariants,
  dropdownVariants,
  optionVariants,
  labelVariants,
};
