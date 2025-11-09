import { cva } from "class-variance-authority";

export const bottomNavigationVariants = cva(
  "fixed bottom-0 left-0 right-0 w-full bg-background transition-all duration-300",
  {
    variants: {
      variant: {
        default: "border-t border-border",
        filled: "shadow-lg",
        shifting: "shadow-2xl",
      },
      elevation: {
        0: "shadow-none",
        1: "shadow-sm",
        2: "shadow-md",
        3: "shadow-lg shadow-black/10 dark:shadow-black/40",
        4: "shadow-xl shadow-black/15 dark:shadow-black/50",
      },
      bordered: {
        true: "border-t border-border",
        false: "border-0",
      },
      hidden: {
        true: "translate-y-full",
        false: "translate-y-0",
      },
    },
    defaultVariants: {
      variant: "default",
      elevation: 3,
      bordered: true,
      hidden: false,
    },
  }
);

export const bottomNavigationContainerVariants = cva(
  "flex items-center justify-around h-16 sm:h-20 px-2 sm:px-4",
  {
    variants: {
      variant: {
        default: "",
        filled: "gap-1",
        shifting: "gap-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const bottomNavigationActionVariants = cva(
  "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 min-w-[64px] flex-1 max-w-[168px] relative cursor-pointer select-none hover:bg-muted/50",
  {
    variants: {
      selected: {
        true: "font-medium",
        false: "text-muted-foreground",
      },
      showLabel: {
        true: "",
        false: "gap-0",
      },
      color: {
        primary: "",
        secondary: "",
        success: "",
        error: "",
        info: "",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none",
        false: "",
      },
    },
    compoundVariants: [
      // Selected states with colors
      {
        selected: true,
        color: "primary",
        className: "text-primary",
      },
      {
        selected: true,
        color: "secondary",
        className: "text-secondary",
      },
      {
        selected: true,
        color: "success",
        className: "text-green-600 dark:text-green-400",
      },
      {
        selected: true,
        color: "error",
        className: "text-red-600 dark:text-red-400",
      },
      {
        selected: true,
        color: "info",
        className: "text-blue-600 dark:text-blue-400",
      },
    ],
    defaultVariants: {
      selected: false,
      showLabel: true,
      color: "primary",
      disabled: false,
    },
  }
);

export const bottomNavigationIconVariants = cva(
  "transition-all duration-300 flex-shrink-0",
  {
    variants: {
      selected: {
        true: "scale-110",
        false: "scale-100",
      },
      size: {
        sm: "h-5 w-5",
        md: "h-6 w-6",
        lg: "h-7 w-7",
      },
    },
    defaultVariants: {
      selected: false,
      size: "md",
    },
  }
);

export const bottomNavigationLabelVariants = cva(
  "text-xs transition-all duration-300 whitespace-nowrap overflow-hidden text-ellipsis max-w-full",
  {
    variants: {
      selected: {
        true: "font-semibold opacity-100",
        false: "font-medium opacity-70",
      },
      show: {
        true: "block",
        false: "hidden",
      },
    },
    defaultVariants: {
      selected: false,
      show: true,
    },
  }
);

export const bottomNavigationBadgeVariants = cva(
  "absolute top-1 right-2 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold rounded-full bg-red-500 text-white",
  {
    variants: {
      variant: {
        dot: "min-w-[8px] h-[8px] p-0",
        standard: "min-w-[18px] h-[18px] px-1",
      },
    },
    defaultVariants: {
      variant: "standard",
    },
  }
);

export const bottomNavigationRippleVariants = cva(
  "absolute inset-0 rounded-lg overflow-hidden pointer-events-none",
  {
    variants: {
      active: {
        true: "bg-current opacity-10",
        false: "opacity-0",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);
