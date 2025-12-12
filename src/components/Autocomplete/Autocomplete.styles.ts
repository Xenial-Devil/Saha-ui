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
        xs: "h-6 px-1.5 text-xs",
        sm: "h-8 px-2 text-sm",
        md: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base",
        xl: "h-14 px-5 text-lg",
        "2xl": "h-16 px-6 text-xl",
        "3xl": "h-20 px-8 text-2xl",
        "4xl": "h-24 px-10 text-3xl",
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
  }
);

const inputVariants = cva(
  "flex-1 bg-transparent outline-none placeholder:text-muted-foreground",
  {
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-sm",
        lg: "text-base",
        xl: "text-lg",
        "2xl": "text-xl",
        "3xl": "text-2xl",
        "4xl": "text-3xl",
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
  }
);

const dropdownVariants = cva(
  "absolute z-50 w-full mt-1 rounded-lg shadow-2xl overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-card border border-border",
        filled: "bg-card border border-border",
        outlined: "bg-card border border-border",
        ghost: "bg-card border border-border",
        glass:
          "bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/10",
        primary: "bg-card border border-primary/40",
        success: "bg-card border border-success/40",
        warning: "bg-card border border-warning/40",
        error: "bg-card border border-danger/40",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const optionVariants = cva(
  "flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors duration-150",
  {
    variants: {
      variant: {
        default: "",
        filled: "",
        outlined: "",
        ghost: "",
        glass: "",
        primary: "",
        success: "",
        warning: "",
        error: "",
      },
      size: {
        xs: "px-1.5 py-1 text-[10px]",
        sm: "px-2 py-1.5 text-xs",
        md: "px-3 py-2 text-sm",
        lg: "px-4 py-2.5 text-base",
        xl: "px-5 py-3 text-lg",
        "2xl": "px-6 py-3.5 text-xl",
        "3xl": "px-8 py-4 text-2xl",
        "4xl": "px-10 py-5 text-3xl",
      },
      highlighted: {
        true: "",
        false: "",
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
    compoundVariants: [
      // Default behavior: highlighted uses primary tone
      {
        variant: "default",
        highlighted: true,
        className: "bg-primary/10 text-primary",
      },
      {
        variant: "default",
        highlighted: false,
        className: "text-foreground hover:bg-muted",
      },

      // Primary
      {
        variant: "primary",
        highlighted: true,
        className: "bg-primary/10 text-primary",
      },
      {
        variant: "primary",
        highlighted: false,
        className: "text-foreground hover:bg-primary/6",
      },
      {
        variant: "primary",
        selected: true,
        className: "text-primary bg-primary/10 font-medium",
      },

      // Success
      {
        variant: "success",
        highlighted: true,
        className: "bg-success/10 text-success",
      },
      {
        variant: "success",
        highlighted: false,
        className: "text-foreground hover:bg-success/6",
      },
      {
        variant: "success",
        selected: true,
        className: "text-success bg-success/10 font-medium",
      },

      // Warning
      {
        variant: "warning",
        highlighted: true,
        className: "bg-warning/10 text-warning",
      },
      {
        variant: "warning",
        highlighted: false,
        className: "text-foreground hover:bg-warning/6",
      },
      {
        variant: "warning",
        selected: true,
        className: "text-warning bg-warning/10 font-medium",
      },

      // Error
      {
        variant: "error",
        highlighted: true,
        className: "bg-danger/10 text-danger",
      },
      {
        variant: "error",
        highlighted: false,
        className: "text-foreground hover:bg-danger/6",
      },
      {
        variant: "error",
        selected: true,
        className: "text-danger bg-danger/10 font-medium",
      },

      // Glass / ghost / filled / outlined keep subtle hover
      {
        variant: "glass",
        highlighted: true,
        className: "bg-white/8 text-foreground",
      },
      {
        variant: "glass",
        highlighted: false,
        className: "text-foreground hover:bg-white/5",
      },
      {
        variant: "ghost",
        highlighted: true,
        className: "bg-muted/10 text-foreground",
      },
      {
        variant: "ghost",
        highlighted: false,
        className: "text-foreground hover:bg-muted/6",
      },
      {
        variant: "filled",
        highlighted: true,
        className: "bg-muted/20 text-foreground",
      },
      {
        variant: "filled",
        highlighted: false,
        className: "text-foreground hover:bg-muted/6",
      },
      {
        variant: "outlined",
        highlighted: true,
        className: "bg-muted/10 text-foreground",
      },
      {
        variant: "outlined",
        highlighted: false,
        className: "text-foreground hover:bg-muted/6",
      },

      // Ensure selected has font weight and variant color where appropriate
      {
        variant: "default",
        selected: true,
        className: "text-primary font-medium",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      highlighted: false,
      selected: false,
      disabled: false,
    },
  }
);

const labelVariants = cva("block mb-1.5 font-medium text-foreground", {
  variants: {
    size: {
      xs: "text-[10px]",
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
      xl: "text-lg",
      "2xl": "text-xl",
      "3xl": "text-2xl",
      "4xl": "text-3xl",
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
