import { cva } from "class-variance-authority";
// ===== CVA Variants =====

const fieldSetVariants = cva("border rounded-lg transition-all duration-200", {
  variants: {
    variant: {
      default: "border-border bg-background",
      filled: "border-transparent bg-muted",
      outlined: "border-2 border-border bg-transparent",
      ghost: "border-transparent bg-transparent",
      glass: "border-border/30 bg-background/50 backdrop-blur-xl",
      primary: "border-primary bg-primary/5",
      success: "border-success bg-success/5",
      warning: "border-warning bg-warning/5",
      error: "border-danger bg-danger/5",
    },
    size: {
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
    },
    disabled: {
      true: "opacity-50 cursor-not-allowed",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    disabled: false,
  },
});

const legendVariants = cva("font-semibold mb-4", {
  variants: {
    size: {
      sm: "text-sm px-2",
      md: "text-base px-3",
      lg: "text-lg px-4",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const fieldGroupVariants = cva("flex gap-4", {
  variants: {
    orientation: {
      vertical: "flex-col",
      horizontal: "flex-row flex-wrap",
    },
    spacing: {
      none: "gap-0",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    },
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      columns: [2, 3, 4],
      className: "grid",
    },
  ],
  defaultVariants: {
    orientation: "vertical",
    spacing: "md",
    columns: 1,
  },
});

const fieldContainerVariants = cva("w-full", {
  variants: {
    orientation: {
      vertical: "flex flex-col gap-1.5",
      horizontal: "flex items-start gap-4",
    },
    disabled: {
      true: "opacity-60 cursor-not-allowed",
      false: "",
    },
  },
  defaultVariants: {
    orientation: "vertical",
    disabled: false,
  },
});

const fieldLabelVariants = cva(
  "block font-medium text-foreground transition-colors duration-200",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      required: {
        true: "",
        false: "",
      },
      disabled: {
        true: "cursor-not-allowed text-muted-foreground",
        false: "cursor-pointer",
      },
    },
    defaultVariants: {
      size: "md",
      required: false,
      disabled: false,
    },
  }
);

const fieldDescriptionVariants = cva(
  "text-muted-foreground transition-colors duration-200",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      variant: {
        default: "text-muted-foreground",
        filled: "text-muted-foreground",
        outlined: "text-muted-foreground",
        ghost: "text-muted-foreground",
        glass: "text-muted-foreground",
        primary: "text-primary/80",
        success: "text-success/80",
        warning: "text-warning/80",
        error: "text-danger/80",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

const fieldErrorVariants = cva(
  "flex items-start gap-1.5 text-danger font-medium animate-in slide-in-from-top-1 duration-200",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const fieldHintVariants = cva(
  "flex items-start gap-1.5 text-muted-foreground",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);
export {
  fieldSetVariants,
  legendVariants,
  fieldGroupVariants,
  fieldContainerVariants,
  fieldLabelVariants,
  fieldDescriptionVariants,
  fieldErrorVariants,
  fieldHintVariants,
};
