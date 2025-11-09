import { cva } from "class-variance-authority";

export const stepperVariants = cva(
  "flex transition-all duration-300",
  {
    variants: {
      orientation: {
        horizontal: "flex-row items-start w-full",
        vertical: "flex-col items-start",
      },
      variant: {
        default: "",
        outlined: "",
        filled: "",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      variant: "default",
    },
  }
);

export const stepItemVariants = cva(
  "flex transition-all duration-300",
  {
    variants: {
      orientation: {
        horizontal: "flex-col items-center flex-1",
        vertical: "flex-row items-start w-full",
      },
      interactive: {
        true: "cursor-pointer",
        false: "cursor-default",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      interactive: false,
    },
  }
);

export const stepIconContainerVariants = cva(
  "flex items-center justify-center rounded-full transition-all duration-300 font-semibold relative z-10",
  {
    variants: {
      variant: {
        default: "border-2",
        outlined: "border-2 bg-transparent",
        filled: "",
      },
      status: {
        active: "",
        complete: "",
        inactive: "",
        error: "",
      },
      color: {
        primary: "",
        secondary: "",
        success: "",
        error: "",
      },
      size: {
        sm: "h-6 w-6 text-xs",
        md: "h-8 w-8 text-sm",
        lg: "h-10 w-10 text-base",
      },
    },
    compoundVariants: [
      // Default variant - Active
      {
        variant: "default",
        status: "active",
        color: "primary",
        className: "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30",
      },
      {
        variant: "default",
        status: "active",
        color: "secondary",
        className: "bg-secondary text-secondary-foreground border-secondary shadow-lg shadow-secondary/30",
      },
      {
        variant: "default",
        status: "active",
        color: "success",
        className: "bg-green-500 text-white border-green-500 shadow-lg shadow-green-500/30",
      },
      {
        variant: "default",
        status: "active",
        color: "error",
        className: "bg-red-500 text-white border-red-500 shadow-lg shadow-red-500/30",
      },
      // Default variant - Complete
      {
        variant: "default",
        status: "complete",
        color: "primary",
        className: "bg-primary text-primary-foreground border-primary",
      },
      {
        variant: "default",
        status: "complete",
        color: "secondary",
        className: "bg-secondary text-secondary-foreground border-secondary",
      },
      {
        variant: "default",
        status: "complete",
        color: "success",
        className: "bg-green-500 text-white border-green-500",
      },
      {
        variant: "default",
        status: "complete",
        color: "error",
        className: "bg-red-500 text-white border-red-500",
      },
      // Default variant - Inactive
      {
        variant: "default",
        status: "inactive",
        className: "bg-muted text-muted-foreground border-muted-foreground/30",
      },
      // Default variant - Error
      {
        variant: "default",
        status: "error",
        className: "bg-red-500 text-white border-red-500",
      },
      // Outlined variant - Active
      {
        variant: "outlined",
        status: "active",
        color: "primary",
        className: "border-primary text-primary bg-primary/10",
      },
      {
        variant: "outlined",
        status: "active",
        color: "secondary",
        className: "border-secondary text-secondary bg-secondary/10",
      },
      {
        variant: "outlined",
        status: "active",
        color: "success",
        className: "border-green-500 text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400",
      },
      {
        variant: "outlined",
        status: "active",
        color: "error",
        className: "border-red-500 text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400",
      },
      // Outlined variant - Complete
      {
        variant: "outlined",
        status: "complete",
        color: "primary",
        className: "border-primary text-primary bg-background",
      },
      {
        variant: "outlined",
        status: "complete",
        color: "secondary",
        className: "border-secondary text-secondary bg-background",
      },
      {
        variant: "outlined",
        status: "complete",
        color: "success",
        className: "border-green-500 text-green-600 dark:text-green-400 bg-background",
      },
      {
        variant: "outlined",
        status: "complete",
        color: "error",
        className: "border-red-500 text-red-600 dark:text-red-400 bg-background",
      },
      // Outlined variant - Inactive
      {
        variant: "outlined",
        status: "inactive",
        className: "border-muted-foreground/30 text-muted-foreground bg-background",
      },
      // Outlined variant - Error
      {
        variant: "outlined",
        status: "error",
        className: "border-red-500 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950",
      },
      // Filled variant - Active
      {
        variant: "filled",
        status: "active",
        color: "primary",
        className: "bg-primary text-primary-foreground shadow-lg",
      },
      {
        variant: "filled",
        status: "active",
        color: "secondary",
        className: "bg-secondary text-secondary-foreground shadow-lg",
      },
      {
        variant: "filled",
        status: "active",
        color: "success",
        className: "bg-green-500 text-white shadow-lg",
      },
      {
        variant: "filled",
        status: "active",
        color: "error",
        className: "bg-red-500 text-white shadow-lg",
      },
      // Filled variant - Complete
      {
        variant: "filled",
        status: "complete",
        color: "primary",
        className: "bg-primary/80 text-primary-foreground",
      },
      {
        variant: "filled",
        status: "complete",
        color: "secondary",
        className: "bg-secondary/80 text-secondary-foreground",
      },
      {
        variant: "filled",
        status: "complete",
        color: "success",
        className: "bg-green-500/80 text-white",
      },
      {
        variant: "filled",
        status: "complete",
        color: "error",
        className: "bg-red-500/80 text-white",
      },
      // Filled variant - Inactive
      {
        variant: "filled",
        status: "inactive",
        className: "bg-muted text-muted-foreground",
      },
      // Filled variant - Error
      {
        variant: "filled",
        status: "error",
        className: "bg-red-500 text-white",
      },
    ],
    defaultVariants: {
      variant: "default",
      status: "inactive",
      color: "primary",
      size: "md",
    },
  }
);

export const stepLabelVariants = cva(
  "transition-all duration-300",
  {
    variants: {
      orientation: {
        horizontal: "text-center mt-2",
        vertical: "ml-4",
      },
      status: {
        active: "font-semibold text-foreground",
        complete: "text-foreground",
        inactive: "text-muted-foreground",
        error: "text-red-600 dark:text-red-400",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      status: "inactive",
    },
  }
);

export const stepDescriptionVariants = cva(
  "text-sm transition-all duration-300",
  {
    variants: {
      orientation: {
        horizontal: "text-center",
        vertical: "",
      },
      status: {
        active: "text-muted-foreground",
        complete: "text-muted-foreground",
        inactive: "text-muted-foreground/60",
        error: "text-red-600/80 dark:text-red-400/80",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      status: "inactive",
    },
  }
);

export const stepConnectorVariants = cva(
  "transition-all duration-300",
  {
    variants: {
      orientation: {
        horizontal: "flex-1 h-0.5 mx-2 relative top-4",
        vertical: "w-0.5 h-full ml-4 relative left-0",
      },
      status: {
        active: "",
        complete: "",
        inactive: "bg-muted-foreground/30",
        error: "bg-red-500/30",
      },
      color: {
        primary: "",
        secondary: "",
        success: "",
        error: "",
      },
    },
    compoundVariants: [
      // Complete status colors
      {
        status: "complete",
        color: "primary",
        className: "bg-primary",
      },
      {
        status: "complete",
        color: "secondary",
        className: "bg-secondary",
      },
      {
        status: "complete",
        color: "success",
        className: "bg-green-500",
      },
      {
        status: "complete",
        color: "error",
        className: "bg-red-500",
      },
      // Active status colors
      {
        status: "active",
        color: "primary",
        className: "bg-primary/30",
      },
      {
        status: "active",
        color: "secondary",
        className: "bg-secondary/30",
      },
      {
        status: "active",
        color: "success",
        className: "bg-green-500/30",
      },
      {
        status: "active",
        color: "error",
        className: "bg-red-500/30",
      },
    ],
    defaultVariants: {
      orientation: "horizontal",
      status: "inactive",
      color: "primary",
    },
  }
);

export const stepContentVariants = cva(
  "transition-all duration-300",
  {
    variants: {
      orientation: {
        horizontal: "w-full mt-4",
        vertical: "ml-12 pb-8",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);
