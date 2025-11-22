import { cva } from "class-variance-authority";

export const speedDialVariants = cva(
  "absolute z-20 flex items-center justify-center",
  {
    variants: {
      position: {
        "top-left": "top-4 left-4",
        "top-right": "top-4 right-4",
        "bottom-left": "bottom-4 left-4",
        "bottom-right": "bottom-4 right-4",
      },
    },
    defaultVariants: {
      position: "bottom-right",
    },
  }
);

export const speedDialButtonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all duration-300 select-none relative overflow-hidden isolate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-lg hover:shadow-xl active:shadow-md rounded-full z-10",
  {
    variants: {
      color: {
        default:
          "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600",
        primary:
          "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 shadow-primary/30 hover:shadow-primary/40",
        secondary:
          "bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground hover:from-secondary/90 hover:to-secondary/70 shadow-secondary/30 hover:shadow-secondary/40",
        success:
          "bg-gradient-to-br from-green-500 to-green-600 text-white hover:from-green-400 hover:to-green-500 shadow-green-500/30 hover:shadow-green-500/40",
        warning:
          "bg-yellow-500 text-white hover:bg-yellow-600 shadow-yellow-500/20 hover:shadow-yellow-500/30",
        error:
          "bg-red-500 text-white hover:bg-red-600 shadow-red-500/20 hover:shadow-red-500/30",
        info:
          "bg-blue-500 text-white hover:bg-blue-600 shadow-blue-500/20 hover:shadow-blue-500/30",
      },
      size: {
        sm: "h-12 w-12 text-lg",
        md: "h-14 w-14 text-xl",
        lg: "h-16 w-16 text-2xl",
      },
      open: {
        true: "rotate-45",
        false: "rotate-0",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "md",
      open: false,
    },
  }
);

export const speedDialActionsVariants = cva(
  "absolute flex gap-2 transition-all duration-300",
  {
    variants: {
      direction: {
        up: "flex-col-reverse bottom-full mb-2 left-1/2 -translate-x-1/2",
        down: "flex-col top-full mt-2 left-1/2 -translate-x-1/2",
        left: "flex-row-reverse right-full mr-2 top-1/2 -translate-y-1/2",
        right: "flex-row left-full ml-2 top-1/2 -translate-y-1/2",
      },
      open: {
        true: "opacity-100 scale-100 pointer-events-auto",
        false: "opacity-0 scale-95 pointer-events-none",
      },
    },
    defaultVariants: {
      direction: "up",
      open: false,
    },
  }
);

export const speedDialActionVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 select-none relative overflow-hidden isolate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-md hover:shadow-lg active:shadow-sm rounded-full h-10 w-10 hover:scale-110 active:scale-95",
  {
    variants: {
      color: {
        default:
          "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700",
        primary:
          "bg-primary/90 text-primary-foreground hover:bg-primary",
        secondary:
          "bg-secondary/90 text-secondary-foreground hover:bg-secondary",
        success:
          "bg-green-500 text-white hover:bg-green-600",
        warning:
          "bg-yellow-500 text-white hover:bg-yellow-600",
        error:
          "bg-red-500 text-white hover:bg-red-600",
        info:
          "bg-blue-500 text-white hover:bg-blue-600",
      },
    },
    defaultVariants: {
      color: "default",
    },
  }
);

export const speedDialActionLabelVariants = cva(
  "absolute whitespace-nowrap px-3 py-1.5 rounded-md text-sm font-medium shadow-md bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 pointer-events-none transition-opacity duration-200",
  {
    variants: {
      direction: {
        up: "bottom-full mb-3",
        down: "top-full mt-3",
        left: "right-full mr-3",
        right: "left-full ml-3",
      },
      show: {
        true: "opacity-100",
        false: "opacity-0",
      },
    },
    defaultVariants: {
      direction: "left",
      show: false,
    },
  }
);

export const speedDialBackdropVariants = cva(
  "fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-0",
  {
    variants: {
      open: {
        true: "opacity-100 pointer-events-auto",
        false: "opacity-0 pointer-events-none",
      },
    },
    defaultVariants: {
      open: false,
    },
  }
);
