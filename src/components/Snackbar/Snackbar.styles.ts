import { cva } from "class-variance-authority";

export const snackbarVariants = cva(
  "fixed flex items-center gap-3 rounded-lg shadow-lg transition-all duration-300 min-w-[288px] max-w-[568px] pointer-events-auto",
  {
    variants: {
      variant: {
        default: "bg-background border border-border",
        filled: "",
        outlined: "bg-background border-2",
        soft: "backdrop-blur-sm",
      },
      severity: {
        default: "",
        success: "",
        warning: "",
        error: "",
        info: "",
      },
      position: {
        "top-left": "top-6 left-6",
        "top-center": "top-6 left-1/2 -translate-x-1/2",
        "top-right": "top-6 right-6",
        "bottom-left": "bottom-6 left-6",
        "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
        "bottom-right": "bottom-6 right-6",
      },
      open: {
        true: "animate-in fade-in slide-in-from-bottom-4 duration-300",
        false: "animate-out fade-out slide-out-to-bottom-4 duration-200 pointer-events-none",
      },
    },
    compoundVariants: [
      // Filled variant - default
      {
        variant: "filled",
        severity: "default",
        className: "bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900",
      },
      {
        variant: "filled",
        severity: "success",
        className: "bg-green-600 text-white",
      },
      {
        variant: "filled",
        severity: "warning",
        className: "bg-yellow-600 text-white",
      },
      {
        variant: "filled",
        severity: "error",
        className: "bg-red-600 text-white",
      },
      {
        variant: "filled",
        severity: "info",
        className: "bg-blue-600 text-white",
      },
      // Outlined variant
      {
        variant: "outlined",
        severity: "default",
        className: "border-gray-400 text-foreground",
      },
      {
        variant: "outlined",
        severity: "success",
        className: "border-green-600 text-green-700 dark:text-green-400",
      },
      {
        variant: "outlined",
        severity: "warning",
        className: "border-yellow-600 text-yellow-700 dark:text-yellow-400",
      },
      {
        variant: "outlined",
        severity: "error",
        className: "border-red-600 text-red-700 dark:text-red-400",
      },
      {
        variant: "outlined",
        severity: "info",
        className: "border-blue-600 text-blue-700 dark:text-blue-400",
      },
      // Soft variant
      {
        variant: "soft",
        severity: "default",
        className: "bg-gray-100 dark:bg-gray-800 text-foreground",
      },
      {
        variant: "soft",
        severity: "success",
        className: "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400",
      },
      {
        variant: "soft",
        severity: "warning",
        className: "bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-400",
      },
      {
        variant: "soft",
        severity: "error",
        className: "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400",
      },
      {
        variant: "soft",
        severity: "info",
        className: "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400",
      },
      // Default variant
      {
        variant: "default",
        severity: "success",
        className: "border-green-600",
      },
      {
        variant: "default",
        severity: "warning",
        className: "border-yellow-600",
      },
      {
        variant: "default",
        severity: "error",
        className: "border-red-600",
      },
      {
        variant: "default",
        severity: "info",
        className: "border-blue-600",
      },
    ],
    defaultVariants: {
      variant: "filled",
      severity: "default",
      position: "bottom-center",
      open: false,
    },
  }
);

export const snackbarIconVariants = cva(
  "flex-shrink-0 h-5 w-5",
  {
    variants: {
      severity: {
        default: "text-current",
        success: "text-current",
        warning: "text-current",
        error: "text-current",
        info: "text-current",
      },
    },
    defaultVariants: {
      severity: "default",
    },
  }
);

export const snackbarMessageVariants = cva(
  "flex-1 text-sm font-medium",
  {
    variants: {
      variant: {
        default: "",
        filled: "",
        outlined: "",
        soft: "",
      },
    },
    defaultVariants: {
      variant: "filled",
    },
  }
);

export const snackbarActionVariants = cva(
  "flex-shrink-0 ml-auto",
  {
    variants: {
      variant: {
        default: "",
        filled: "",
        outlined: "",
        soft: "",
      },
    },
    defaultVariants: {
      variant: "filled",
    },
  }
);

export const snackbarCloseVariants = cva(
  "flex-shrink-0 rounded-full p-1 transition-colors hover:bg-black/10 dark:hover:bg-white/10",
  {
    variants: {
      variant: {
        default: "",
        filled: "hover:bg-white/20",
        outlined: "",
        soft: "",
      },
    },
    defaultVariants: {
      variant: "filled",
    },
  }
);
