import { cva } from "class-variance-authority";

export const iconButtonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all duration-300 select-none relative overflow-hidden isolate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700",
  {
    variants: {
      variant: {
        filled: "shadow-lg hover:shadow-xl active:shadow-md",
        outlined: "border-2 bg-transparent hover:shadow-md",
        soft: "backdrop-blur-sm hover:shadow-lg",
        ghost: "hover:shadow-sm",
        gradient: "shadow-lg hover:shadow-xl",
        glass: "backdrop-blur-md border shadow-xl hover:shadow-2xl",
      },
      color: {
        default: "",
        primary: "",
        secondary: "",
        success: "",
        warning: "",
        error: "",
        info: "",
      },
      size: {
        xs: "h-6 w-6 text-xs",
        sm: "h-8 w-8 text-sm",
        md: "h-10 w-10 text-base",
        lg: "h-12 w-12 text-lg",
        xl: "h-14 w-14 text-xl",
      },
      shape: {
        square: "rounded-none",
        rounded: "rounded-lg",
        circle: "rounded-full",
      },
      loading: {
        true: "cursor-wait",
        false: "cursor-pointer hover:scale-110 active:scale-95",
      },
    },
    compoundVariants: [
      // Filled variant colors
      {
        variant: "filled",
        color: "default",
        className:
          "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600",
      },
      {
        variant: "filled",
        color: "primary",
        className:
          "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 shadow-primary/30 hover:shadow-primary/40",
      },
      {
        variant: "filled",
        color: "secondary",
        className:
          "bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground hover:from-secondary/90 hover:to-secondary/70 shadow-secondary/30 hover:shadow-secondary/40",
      },
      {
        variant: "filled",
        color: "success",
        className:
          "bg-gradient-to-br from-green-500 to-green-600 text-white hover:from-green-400 hover:to-green-500 shadow-green-500/30 hover:shadow-green-500/40",
      },
      {
        variant: "filled",
        color: "warning",
        className:
          "bg-yellow-500 text-white hover:bg-yellow-600 shadow-yellow-500/20 hover:shadow-yellow-500/30",
      },
      {
        variant: "filled",
        color: "error",
        className:
          "bg-red-500 text-white hover:bg-red-600 shadow-red-500/20 hover:shadow-red-500/30",
      },
      {
        variant: "filled",
        color: "info",
        className:
          "bg-blue-500 text-white hover:bg-blue-600 shadow-blue-500/20 hover:shadow-blue-500/30",
      },
      // Outlined variant colors
      {
        variant: "outlined",
        color: "default",
        className:
          "border-gray-400 text-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
      },
      {
        variant: "outlined",
        color: "primary",
        className:
          "border-primary text-primary hover:bg-primary/10 dark:hover:bg-primary/20",
      },
      {
        variant: "outlined",
        color: "secondary",
        className:
          "border-secondary text-secondary hover:bg-secondary/10 dark:hover:bg-secondary/20",
      },
      {
        variant: "outlined",
        color: "success",
        className:
          "border-green-500 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950",
      },
      {
        variant: "outlined",
        color: "warning",
        className:
          "border-yellow-500 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-950",
      },
      {
        variant: "outlined",
        color: "error",
        className:
          "border-red-500 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950",
      },
      {
        variant: "outlined",
        color: "info",
        className:
          "border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950",
      },
      // Soft variant colors
      {
        variant: "soft",
        color: "default",
        className:
          "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700",
      },
      {
        variant: "soft",
        color: "primary",
        className:
          "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground hover:bg-primary/20 dark:hover:bg-primary/30",
      },
      {
        variant: "soft",
        color: "secondary",
        className:
          "bg-secondary/10 text-secondary dark:bg-secondary/20 dark:text-secondary-foreground hover:bg-secondary/20 dark:hover:bg-secondary/30",
      },
      {
        variant: "soft",
        color: "success",
        className:
          "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900",
      },
      {
        variant: "soft",
        color: "warning",
        className:
          "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-900",
      },
      {
        variant: "soft",
        color: "error",
        className:
          "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900",
      },
      {
        variant: "soft",
        color: "info",
        className:
          "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900",
      },
      // Ghost variant colors
      {
        variant: "ghost",
        color: "default",
        className:
          "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
      },
      {
        variant: "ghost",
        color: "primary",
        className:
          "text-primary hover:bg-primary/10 dark:hover:bg-primary/20",
      },
      {
        variant: "ghost",
        color: "secondary",
        className:
          "text-secondary hover:bg-secondary/10 dark:hover:bg-secondary/20",
      },
      {
        variant: "ghost",
        color: "success",
        className:
          "text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950",
      },
      {
        variant: "ghost",
        color: "warning",
        className:
          "text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-950",
      },
      {
        variant: "ghost",
        color: "error",
        className:
          "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950",
      },
      {
        variant: "ghost",
        color: "info",
        className:
          "text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950",
      },
      // Gradient variant colors
      {
        variant: "gradient",
        color: "default",
        className:
          "bg-gradient-to-r from-gray-400 to-gray-600 text-white hover:from-gray-500 hover:to-gray-700",
      },
      {
        variant: "gradient",
        color: "primary",
        className:
          "bg-gradient-to-r from-primary/90 to-primary text-primary-foreground hover:from-primary hover:to-primary/90 shadow-primary/20 hover:shadow-primary/40",
      },
      {
        variant: "gradient",
        color: "secondary",
        className:
          "bg-gradient-to-r from-secondary/90 to-secondary text-secondary-foreground hover:from-secondary hover:to-secondary/90 shadow-secondary/20 hover:shadow-secondary/40",
      },
      {
        variant: "gradient",
        color: "success",
        className:
          "bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700 shadow-green-500/20 hover:shadow-green-500/40",
      },
      {
        variant: "gradient",
        color: "warning",
        className:
          "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white hover:from-yellow-500 hover:to-yellow-700 shadow-yellow-500/20 hover:shadow-yellow-500/40",
      },
      {
        variant: "gradient",
        color: "error",
        className:
          "bg-gradient-to-r from-red-400 to-red-600 text-white hover:from-red-500 hover:to-red-700 shadow-red-500/20 hover:shadow-red-500/40",
      },
      {
        variant: "gradient",
        color: "info",
        className:
          "bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-500 hover:to-blue-700 shadow-blue-500/20 hover:shadow-blue-500/40",
      },
      // Glass variant colors
      {
        variant: "glass",
        color: "default",
        className:
          "bg-white/10 dark:bg-black/10 border-white/20 dark:border-white/10 text-foreground hover:bg-white/20 dark:hover:bg-black/20",
      },
      {
        variant: "glass",
        color: "primary",
        className:
          "bg-primary/10 border-primary/30 text-primary hover:bg-primary/20",
      },
      {
        variant: "glass",
        color: "secondary",
        className:
          "bg-secondary/10 border-secondary/30 text-secondary hover:bg-secondary/20",
      },
      {
        variant: "glass",
        color: "success",
        className:
          "bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400 hover:bg-green-500/20",
      },
      {
        variant: "glass",
        color: "warning",
        className:
          "bg-yellow-500/10 border-yellow-500/30 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/20",
      },
      {
        variant: "glass",
        color: "error",
        className:
          "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-500/20",
      },
      {
        variant: "glass",
        color: "info",
        className:
          "bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20",
      },
    ],
    defaultVariants: {
      variant: "ghost",
      color: "default",
      size: "md",
      shape: "rounded",
      loading: false,
    },
  }
);

export const iconWrapperVariants = cva(
  "flex items-center justify-center transition-transform duration-300",
  {
    variants: {
      loading: {
        true: "animate-spin",
        false: "",
      },
    },
    defaultVariants: {
      loading: false,
    },
  }
);
