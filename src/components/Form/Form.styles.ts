// Form.styles.ts
import { cva } from "class-variance-authority";

/**
 * Form container variants
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
        "bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl p-6 shadow-lg shadow-emerald-500/10",
      warning:
        "bg-amber-50 dark:bg-amber-950/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl p-6 shadow-lg shadow-amber-500/10",
      error:
        "bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-6 shadow-lg shadow-red-500/10",
      info: "bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6 shadow-lg shadow-blue-500/10",
      outline:
        "border-2 border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow",
      glass:
        "backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-xl p-6 shadow-xl",
    },
    layout: {
      vertical: "",
      horizontal: "",
      inline: "flex flex-row flex-wrap items-end",
    },
  },
  defaultVariants: {
    variant: "default",
    layout: "vertical",
  },
});

/**
 * Form item container variants
 */
export const formItemVariants = cva("relative transition-all duration-200", {
  variants: {
    layout: {
      vertical: "flex flex-col gap-2",
      horizontal:
        "grid grid-cols-1 sm:grid-cols-[minmax(120px,200px)_1fr] gap-2 sm:gap-4 items-start",
      inline: "flex flex-row items-center gap-3",
    },
    hasError: {
      true: "",
      false: "",
    },
    animate: {
      true: "animate-in fade-in-0 slide-in-from-bottom-2 duration-300",
      false: "",
    },
  },
  compoundVariants: [
    {
      hasError: true,
      className: "animate-shake",
    },
  ],
  defaultVariants: {
    layout: "vertical",
    hasError: false,
    animate: true,
  },
});

/**
 * Form label variants
 */
export const formLabelVariants = cva(
  "text-sm font-medium transition-colors duration-200 select-none inline-flex items-center gap-1.5 cursor-default",
  {
    variants: {
      variant: {
        default: "text-foreground",
        primary: "text-primary",
        secondary: "text-secondary",
        accent: "text-accent",
        success: "text-emerald-700 dark:text-emerald-400",
        warning: "text-amber-700 dark:text-amber-400",
        error: "text-red-700 dark:text-red-400",
        info: "text-blue-700 dark:text-blue-400",
        outline: "text-foreground",
        glass: "text-foreground",
      },
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
      hasError: {
        true: "text-destructive",
        false: "",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
      srOnly: {
        true: "sr-only",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      hasError: false,
      disabled: false,
      srOnly: false,
    },
  }
);

/**
 * Form control wrapper variants
 */
export const formControlVariants = cva("relative transition-all duration-200", {
  variants: {
    hasError: {
      true: "[&_input]:border-destructive [&_input]:focus-visible:ring-destructive [&_textarea]:border-destructive [&_textarea]:focus-visible:ring-destructive [&_select]:border-destructive [&_select]:focus-visible:ring-destructive",
      false: "",
    },
    disabled: {
      true: "opacity-50 pointer-events-none [&_*]:cursor-not-allowed",
      false: "",
    },
  },
  defaultVariants: {
    hasError: false,
    disabled: false,
  },
});

/**
 * Form description variants
 */
export const formDescriptionVariants = cva("transition-colors duration-200", {
  variants: {
    variant: {
      default: "text-muted-foreground",
      primary: "text-primary/70",
      secondary: "text-secondary/70",
      accent: "text-accent/70",
      success: "text-emerald-600/70 dark:text-emerald-400/70",
      warning: "text-amber-600/70 dark:text-amber-400/70",
      error: "text-red-600/70 dark:text-red-400/70",
      info: "text-blue-600/70 dark:text-blue-400/70",
      outline: "text-muted-foreground",
      glass: "text-muted-foreground/90",
    },
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
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
  },
});

/**
 * Form message variants
 */
export const formMessageVariants = cva(
  "flex items-center gap-1.5 font-medium transition-all duration-200",
  {
    variants: {
      variant: {
        error: "text-destructive",
        success: "text-emerald-600 dark:text-emerald-400",
        warning: "text-amber-600 dark:text-amber-400",
        info: "text-blue-600 dark:text-blue-400",
      },
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
      animate: {
        true: "animate-in fade-in-0 slide-in-from-top-1 duration-200",
        false: "",
      },
    },
    defaultVariants: {
      variant: "error",
      size: "sm",
      animate: true,
    },
  }
);

/**
 * Form section variants
 */
export const formSectionVariants = cva("relative transition-all duration-300", {
  variants: {
    variant: {
      default: "",
      primary: "border-l-4 border-primary pl-4",
      secondary: "border-l-4 border-secondary pl-4",
      accent: "border-l-4 border-accent pl-4",
      success: "border-l-4 border-emerald-500 pl-4",
      warning: "border-l-4 border-amber-500 pl-4",
      error: "border-l-4 border-red-500 pl-4",
      info: "border-l-4 border-blue-500 pl-4",
      outline: "border-2 border-border rounded-lg p-4",
      glass:
        "backdrop-blur-lg bg-white/5 border border-white/10 rounded-lg p-4",
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
  "text-lg font-semibold transition-colors duration-200 flex items-center gap-2",
  {
    variants: {
      variant: {
        default: "text-foreground",
        primary: "text-primary",
        secondary: "text-secondary",
        accent: "text-accent",
        success: "text-emerald-700 dark:text-emerald-400",
        warning: "text-amber-700 dark:text-amber-400",
        error: "text-red-700 dark:text-red-400",
        info: "text-blue-700 dark:text-blue-400",
        outline: "text-foreground",
        glass: "text-foreground",
      },
      collapsible: {
        true: "cursor-pointer hover:opacity-80 select-none",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      collapsible: false,
    },
  }
);

/**
 * Form actions variants
 */
export const formActionsVariants = cva(
  "flex gap-3 pt-6 transition-all duration-200",
  {
    variants: {
      align: {
        left: "justify-start",
        center: "justify-center",
        right: "justify-end",
        between: "justify-between",
        around: "justify-around",
      },
      bordered: {
        true: "border-t border-border mt-6",
        false: "mt-4",
      },
      sticky: {
        true: "sticky bottom-0 bg-background/95 backdrop-blur-sm pb-4 -mx-6 px-6 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]",
        false: "",
      },
    },
    defaultVariants: {
      align: "right",
      bordered: true,
      sticky: false,
    },
  }
);

/**
 * Loading overlay variants
 */
export const loadingOverlayVariants = cva(
  "absolute inset-0 flex flex-col items-center justify-center gap-3 z-50 rounded-[inherit] transition-all duration-300",
  {
    variants: {
      visible: {
        true: "opacity-100 backdrop-blur-sm bg-background/80",
        false: "opacity-0 pointer-events-none",
      },
    },
    defaultVariants: {
      visible: false,
    },
  }
);

/**
 * Progress bar variants
 */
export const progressVariants = cva("w-full mb-6", {
  variants: {
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const progressBarVariants = cva(
  "rounded-full overflow-hidden bg-muted",
  {
    variants: {
      size: {
        sm: "h-1",
        md: "h-2",
        lg: "h-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const progressFillVariants = cva(
  "h-full transition-all duration-500 ease-out rounded-full",
  {
    variants: {
      variant: {
        default: "bg-primary",
        primary: "bg-primary",
        secondary: "bg-secondary",
        accent: "bg-accent",
        success: "bg-emerald-500",
        warning: "bg-amber-500",
        error: "bg-red-500",
        info: "bg-blue-500",
        outline: "bg-primary",
        glass: "bg-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
