import { cva } from "class-variance-authority";
/**
 * DatePicker input variant styles using CVA
 */
export const datePickerVariants = cva(
  [
    "w-full",
    "inline-flex",
    "items-center",
    "justify-between",
    "gap-2",
    "font-medium",
    "transition-all",
    "duration-200",
    "border",
    "cursor-pointer",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
    "disabled:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-base-200",
          "text-base-content",
          "border-base-300",
          "hover:bg-base-300",
          "focus:ring-primary",
        ],
        primary: [
          "bg-primary/10",
          "text-primary",
          "border-primary/20",
          "hover:bg-primary/20",
          "focus:ring-primary",
        ],
        secondary: [
          "bg-secondary/10",
          "text-secondary",
          "border-secondary/20",
          "hover:bg-secondary/20",
          "focus:ring-secondary",
        ],
        accent: [
          "bg-accent/10",
          "text-accent",
          "border-accent/20",
          "hover:bg-accent/20",
          "focus:ring-accent",
        ],
        success: [
          "bg-success/10",
          "text-success",
          "border-success/20",
          "hover:bg-success/20",
          "focus:ring-success",
        ],
        warning: [
          "bg-warning/10",
          "text-warning",
          "border-warning/20",
          "hover:bg-warning/20",
          "focus:ring-warning",
        ],
        danger: [
          "bg-destructive/10",
          "text-destructive",
          "border-destructive/20",
          "hover:bg-destructive/20",
          "focus:ring-destructive",
        ],
        info: [
          "bg-info/10",
          "text-info",
          "border-info/20",
          "hover:bg-info/20",
          "focus:ring-info",
        ],
        glass: [
          "backdrop-blur-xl",
          "bg-white/30 dark:bg-gray-900/40",
          "border-white/40 dark:border-white/20",
          "text-base-content",
          "hover:bg-white/40 dark:hover:bg-gray-900/50",
          "focus:ring-primary",
        ],
        bordered: [
          "bg-base-100",
          "text-base-content",
          "border-2 border-base-300",
          "hover:bg-base-200",
          "focus:ring-primary",
        ],
        elevated: [
          "bg-base-100",
          "text-base-content",
          "border-base-300",
          "shadow-lg",
          "hover:shadow-xl",
          "focus:ring-primary",
        ],
        flat: [
          "bg-base-200",
          "text-base-content",
          "border-transparent",
          "hover:bg-base-300",
          "focus:ring-primary",
        ],
        outlined: [
          "bg-transparent",
          "text-base-content",
          "border-base-content/20",
          "hover:bg-base-content/5",
          "hover:border-base-content/30",
          "focus:ring-base-content/20",
        ],
        minimal: [
          "bg-transparent",
          "text-base-content",
          "border-transparent",
          "hover:bg-base-200",
          "focus:ring-primary",
        ],
      },
      size: {
        sm: ["h-8", "px-2", "text-sm", "rounded-md"],
        md: ["h-10", "px-3", "text-base", "rounded-lg"],
        lg: ["h-12", "px-4", "text-lg", "rounded-lg"],
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

/**
 * Calendar dropdown variant styles
 */
export const calendarVariants = cva(
  ["shadow-lg", "border", "px-1", "py-0.5", "rounded-lg"],
  {
    variants: {
      variant: {
        default: [
          "bg-white dark:bg-gray-800",
          "border-base-300",
          "text-base-content",
        ],
        primary: [
          "bg-white dark:bg-gray-800",
          "border-primary/20",
          "text-base-content",
        ],
        secondary: [
          "bg-white dark:bg-gray-800",
          "border-secondary/20",
          "text-base-content",
        ],
        accent: [
          "bg-white dark:bg-gray-800",
          "border-accent/20",
          "text-base-content",
        ],
        success: [
          "bg-white dark:bg-gray-800",
          "border-success/20",
          "text-base-content",
        ],
        warning: [
          "bg-white dark:bg-gray-800",
          "border-warning/20",
          "text-base-content",
        ],
        danger: [
          "bg-white dark:bg-gray-800",
          "border-destructive/20",
          "text-base-content",
        ],
        info: [
          "bg-white dark:bg-gray-800",
          "border-info/20",
          "text-base-content",
        ],
        glass: [
          "backdrop-blur-xl",
          "bg-white/30 dark:bg-gray-900/40",
          "border-white/40 dark:border-white/20",
          "text-base-content",
        ],
        bordered: [
          "bg-white dark:bg-gray-800",
          "border-2 border-base-300",
          "text-base-content",
        ],
        elevated: [
          "bg-white dark:bg-gray-800",
          "border-base-300",
          "text-base-content",
          "shadow-2xl",
        ],
        flat: [
          "bg-white dark:bg-gray-800",
          "border-base-300",
          "text-base-content",
        ],
        outlined: [
          "bg-white dark:bg-gray-800",
          "border-base-content/20",
          "text-base-content",
        ],
        minimal: [
          "bg-white dark:bg-gray-800",
          "border-base-300",
          "text-base-content",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);