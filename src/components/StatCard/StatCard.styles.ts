import { cva } from "class-variance-authority";

export const statCardVariants = cva(
  "relative rounded-lg border transition-all duration-300 overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-card shadow-sm hover:shadow-md",
        outlined: "bg-transparent border-2 hover:shadow-sm",
        filled: "border-0 shadow-md hover:shadow-lg",
        gradient: "border-0 shadow-lg hover:shadow-xl",
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
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
      clickable: {
        true: "cursor-pointer hover:scale-[1.02] active:scale-[0.98]",
        false: "",
      },
      loading: {
        true: "animate-pulse pointer-events-none",
        false: "",
      },
    },
    compoundVariants: [
      // Default variant colors
      {
        variant: "default",
        color: "default",
        className: "border-border",
      },
      {
        variant: "default",
        color: "primary",
        className: "border-primary/20 hover:border-primary/40",
      },
      {
        variant: "default",
        color: "secondary",
        className: "border-secondary/20 hover:border-secondary/40",
      },
      {
        variant: "default",
        color: "success",
        className: "border-green-200 dark:border-green-900 hover:border-green-300 dark:hover:border-green-800",
      },
      {
        variant: "default",
        color: "warning",
        className: "border-yellow-200 dark:border-yellow-900 hover:border-yellow-300 dark:hover:border-yellow-800",
      },
      {
        variant: "default",
        color: "error",
        className: "border-red-200 dark:border-red-900 hover:border-red-300 dark:hover:border-red-800",
      },
      {
        variant: "default",
        color: "info",
        className: "border-blue-200 dark:border-blue-900 hover:border-blue-300 dark:hover:border-blue-800",
      },
      // Outlined variant colors
      {
        variant: "outlined",
        color: "default",
        className: "border-border",
      },
      {
        variant: "outlined",
        color: "primary",
        className: "border-primary",
      },
      {
        variant: "outlined",
        color: "secondary",
        className: "border-secondary",
      },
      {
        variant: "outlined",
        color: "success",
        className: "border-green-500",
      },
      {
        variant: "outlined",
        color: "warning",
        className: "border-yellow-500",
      },
      {
        variant: "outlined",
        color: "error",
        className: "border-red-500",
      },
      {
        variant: "outlined",
        color: "info",
        className: "border-blue-500",
      },
      // Filled variant colors
      {
        variant: "filled",
        color: "default",
        className: "bg-muted text-foreground",
      },
      {
        variant: "filled",
        color: "primary",
        className: "bg-primary/10 dark:bg-primary/20 text-primary",
      },
      {
        variant: "filled",
        color: "secondary",
        className: "bg-secondary/10 dark:bg-secondary/20 text-secondary",
      },
      {
        variant: "filled",
        color: "success",
        className: "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300",
      },
      {
        variant: "filled",
        color: "warning",
        className: "bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300",
      },
      {
        variant: "filled",
        color: "error",
        className: "bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300",
      },
      {
        variant: "filled",
        color: "info",
        className: "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300",
      },
      // Gradient variant colors
      {
        variant: "gradient",
        color: "default",
        className: "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900",
      },
      {
        variant: "gradient",
        color: "primary",
        className: "bg-gradient-to-br from-primary/10 to-primary/30 dark:from-primary/20 dark:to-primary/40 text-primary",
      },
      {
        variant: "gradient",
        color: "secondary",
        className: "bg-gradient-to-br from-secondary/10 to-secondary/30 dark:from-secondary/20 dark:to-secondary/40 text-secondary",
      },
      {
        variant: "gradient",
        color: "success",
        className: "bg-gradient-to-br from-green-100 to-green-200 dark:from-green-950 dark:to-green-900 text-green-700 dark:text-green-300",
      },
      {
        variant: "gradient",
        color: "warning",
        className: "bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-950 dark:to-yellow-900 text-yellow-700 dark:text-yellow-300",
      },
      {
        variant: "gradient",
        color: "error",
        className: "bg-gradient-to-br from-red-100 to-red-200 dark:from-red-950 dark:to-red-900 text-red-700 dark:text-red-300",
      },
      {
        variant: "gradient",
        color: "info",
        className: "bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-950 dark:to-blue-900 text-blue-700 dark:text-blue-300",
      },
      // Glass variant colors
      {
        variant: "glass",
        color: "default",
        className: "bg-white/10 dark:bg-black/10 border-white/20 dark:border-white/10",
      },
      {
        variant: "glass",
        color: "primary",
        className: "bg-primary/10 border-primary/30",
      },
      {
        variant: "glass",
        color: "secondary",
        className: "bg-secondary/10 border-secondary/30",
      },
      {
        variant: "glass",
        color: "success",
        className: "bg-green-500/10 border-green-500/30",
      },
      {
        variant: "glass",
        color: "warning",
        className: "bg-yellow-500/10 border-yellow-500/30",
      },
      {
        variant: "glass",
        color: "error",
        className: "bg-red-500/10 border-red-500/30",
      },
      {
        variant: "glass",
        color: "info",
        className: "bg-blue-500/10 border-blue-500/30",
      },
    ],
    defaultVariants: {
      variant: "default",
      color: "default",
      size: "md",
      clickable: false,
      loading: false,
    },
  }
);

export const statCardHeaderVariants = cva(
  "flex items-start justify-between gap-4 mb-2",
  {
    variants: {
      size: {
        sm: "mb-1",
        md: "mb-2",
        lg: "mb-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const statCardTitleVariants = cva(
  "font-medium text-muted-foreground",
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

export const statCardIconVariants = cva(
  "rounded-lg p-2 flex items-center justify-center",
  {
    variants: {
      color: {
        default: "bg-muted text-muted-foreground",
        primary: "bg-primary/10 text-primary",
        secondary: "bg-secondary/10 text-secondary",
        success: "bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400",
        warning: "bg-yellow-100 dark:bg-yellow-950 text-yellow-600 dark:text-yellow-400",
        error: "bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400",
        info: "bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400",
      },
      size: {
        sm: "p-1.5 text-sm",
        md: "p-2 text-base",
        lg: "p-2.5 text-lg",
      },
    },
    defaultVariants: {
      color: "default",
      size: "md",
    },
  }
);

export const statCardValueVariants = cva(
  "font-bold text-foreground",
  {
    variants: {
      size: {
        sm: "text-xl",
        md: "text-3xl",
        lg: "text-4xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const statCardDescriptionVariants = cva(
  "text-muted-foreground mt-1",
  {
    variants: {
      size: {
        sm: "text-xs mt-0.5",
        md: "text-sm mt-1",
        lg: "text-base mt-1.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const statCardTrendVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium transition-colors",
  {
    variants: {
      trend: {
        up: "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400",
        down: "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400",
        neutral: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400",
      },
      size: {
        sm: "text-xs px-1.5 py-0.5",
        md: "text-sm px-2 py-0.5",
        lg: "text-base px-2.5 py-1",
      },
    },
    defaultVariants: {
      trend: "neutral",
      size: "md",
    },
  }
);

export const statCardFooterVariants = cva(
  "mt-4 pt-4 border-t border-border/50",
  {
    variants: {
      size: {
        sm: "mt-2 pt-2",
        md: "mt-4 pt-4",
        lg: "mt-6 pt-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const statCardSkeletonVariants = cva(
  "animate-pulse bg-muted rounded",
  {
    variants: {
      size: {
        sm: "h-3",
        md: "h-4",
        lg: "h-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);
