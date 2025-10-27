import { cva } from "class-variance-authority";

/**
 * Form variants
 */
export const formVariants = cva("relative w-full transition-all duration-300", {
  variants: {
    variant: {
      default: "bg-background",
      primary:
        "bg-primary/5 border-2 border-primary/20 rounded-xl p-6 shadow-lg shadow-primary/10",
      secondary:
        "bg-secondary/5 border-2 border-secondary/20 rounded-xl p-6 shadow-lg shadow-secondary/10",
      accent:
        "bg-accent/5 border-2 border-accent/20 rounded-xl p-6 shadow-lg shadow-accent/10",
      success:
        "bg-success/5 border-2 border-success/20 rounded-xl p-6 shadow-lg shadow-success/10",
      warning:
        "bg-warning/5 border-2 border-warning/20 rounded-xl p-6 shadow-lg shadow-warning/10",
      error:
        "bg-error/5 border-2 border-error/20 rounded-xl p-6 shadow-lg shadow-error/10",
      info: "bg-info/5 border-2 border-info/20 rounded-xl p-6 shadow-lg shadow-info/10",
      outline:
        "border-2 border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow",
      glass:
        "glass backdrop-blur-2xl border-2 border-border/30 rounded-xl p-6 shadow-[0_8px_32px_0] shadow-black/10",
    },
    spacing: {
      none: "space-y-0",
      sm: "space-y-3",
      md: "space-y-4",
      lg: "space-y-6",
    },
    layout: {
      vertical: "flex flex-col",
      horizontal: "grid grid-cols-[200px_1fr] gap-6",
      inline: "flex flex-row flex-wrap gap-4",
    },
  },
  defaultVariants: {
    variant: "default",
    spacing: "md",
    layout: "vertical",
  },
});

/**
 * Form item variants
 */
export const formItemVariants = cva("relative", {
  variants: {
    layout: {
      vertical: "flex flex-col gap-1.5",
      horizontal: "grid grid-cols-[200px_1fr] gap-4 items-start",
      inline: "flex flex-row items-center gap-3",
    },
    variant: {
      default: "",
      primary: "",
      secondary: "",
      accent: "",
      success: "",
      warning: "",
      error: "",
      info: "",
      outline: "",
      glass: "",
    },
  },
  defaultVariants: {
    layout: "vertical",
    variant: "default",
  },
});

/**
 * Form label variants
 */
export const formLabelVariants = cva(
  "text-sm font-medium transition-colors duration-200 select-none",
  {
    variants: {
      variant: {
        default: "text-foreground",
        primary: "text-primary",
        secondary: "text-secondary",
        accent: "text-accent",
        success: "text-success",
        warning: "text-warning",
        error: "text-error",
        info: "text-info",
        outline: "text-foreground",
        glass: "text-foreground",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      required: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      required: false,
    },
  }
);

/**
 * Form control variants
 */
export const formControlVariants = cva("relative", {
  variants: {},
  defaultVariants: {},
});

/**
 * Form description variants
 */
export const formDescriptionVariants = cva(
  "text-muted-foreground transition-colors duration-200",
  {
    variants: {
      variant: {
        default: "text-muted-foreground",
        primary: "text-primary/70",
        secondary: "text-secondary/70",
        accent: "text-accent/70",
        success: "text-success/70",
        warning: "text-warning/70",
        error: "text-error/70",
        info: "text-info/70",
        outline: "text-muted-foreground",
        glass: "text-muted-foreground",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
);

/**
 * Form message variants
 */
export const formMessageVariants = cva(
  "flex items-center gap-2 text-sm font-medium transition-all duration-200 animate-in fade-in-0 slide-in-from-top-1",
  {
    variants: {
      variant: {
        error: "text-error",
        success: "text-success",
        warning: "text-warning",
        info: "text-info",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "error",
      size: "sm",
    },
  }
);

/**
 * Form section variants
 */
export const formSectionVariants = cva("relative", {
  variants: {
    variant: {
      default: "",
      primary: "border-l-4 border-primary pl-4",
      secondary: "border-l-4 border-secondary pl-4",
      accent: "border-l-4 border-accent pl-4",
      success: "border-l-4 border-success pl-4",
      warning: "border-l-4 border-warning pl-4",
      error: "border-l-4 border-error pl-4",
      info: "border-l-4 border-info pl-4",
      outline: "border-2 border-border rounded-lg p-4",
      glass: "glass backdrop-blur-xl border-2 border-border/30 rounded-lg p-4",
    },
    divider: {
      true: "pb-6 mb-6 border-b border-border",
      false: "mb-6",
    },
  },
  defaultVariants: {
    variant: "default",
    divider: false,
  },
});

/**
 * Form section title variants
 */
export const formSectionTitleVariants = cva(
  "text-lg font-semibold mb-2 transition-colors duration-200",
  {
    variants: {
      variant: {
        default: "text-foreground",
        primary: "text-primary",
        secondary: "text-secondary",
        accent: "text-accent",
        success: "text-success",
        warning: "text-warning",
        error: "text-error",
        info: "text-info",
        outline: "text-foreground",
        glass: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Form actions variants
 */
export const formActionsVariants = cva(
  "flex gap-3 mt-6 pt-6 border-t border-border",
  {
    variants: {
      align: {
        left: "justify-start",
        center: "justify-center",
        right: "justify-end",
        between: "justify-between",
      },
      variant: {
        default: "",
        primary: "",
        secondary: "",
        accent: "",
        success: "",
        warning: "",
        error: "",
        info: "",
        outline: "",
        glass: "",
      },
    },
    defaultVariants: {
      align: "right",
      variant: "default",
    },
  }
);
