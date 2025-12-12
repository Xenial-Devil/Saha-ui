import { cva } from "class-variance-authority";

export const segmentedVariants = cva(
  "inline-flex items-center relative rounded-lg p-1 transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-muted",
        outlined: "border-2 border-border bg-transparent",
        filled: "bg-primary/10",
      },
      size: {
        xs: "p-0.5 text-xs",
        sm: "p-0.5 text-sm",
        md: "p-1 text-base",
        lg: "p-1.5 text-lg",
        xl: "p-2 text-xl",
        "2xl": "p-2.5 text-2xl",
        "3xl": "p-3 text-3xl",
        "4xl": "p-4 text-4xl",
      },
      block: {
        true: "w-full",
        false: "w-auto",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      block: false,
      disabled: false,
    },
  }
);

export const segmentedOptionVariants = cva(
  "relative z-10 inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 cursor-pointer whitespace-nowrap select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "",
        outlined: "",
        filled: "",
      },
      size: {
        xs: "px-2 py-0.5 text-xs rounded-sm",
        sm: "px-3 py-1 text-sm rounded-md",
        md: "px-4 py-1.5 text-base rounded-md",
        lg: "px-6 py-2 text-lg rounded-lg",
        xl: "px-8 py-2.5 text-xl rounded-lg",
        "2xl": "px-10 py-3 text-2xl rounded-xl",
        "3xl": "px-12 py-4 text-3xl rounded-xl",
        "4xl": "px-16 py-5 text-4xl rounded-2xl",
      },
      active: {
        true: "",
        false: "text-muted-foreground hover:text-foreground",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "",
      },
      block: {
        true: "flex-1",
        false: "",
      },
    },
    compoundVariants: [
      {
        active: true,
        variant: "default",
        className: "text-foreground",
      },
      {
        active: true,
        variant: "outlined",
        className: "text-primary",
      },
      {
        active: true,
        variant: "filled",
        className: "text-primary",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      active: false,
      disabled: false,
      block: false,
    },
  }
);

export const segmentedIndicatorVariants = cva(
  "absolute inset-0 rounded-md transition-all duration-300 ease-out pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-background shadow-sm",
        outlined: "bg-primary/10 border border-primary",
        filled: "bg-primary/20",
      },
      size: {
        xs: "rounded-sm",
        sm: "rounded-md",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-lg",
        "2xl": "rounded-xl",
        "3xl": "rounded-xl",
        "4xl": "rounded-2xl",
      },
      animated: {
        true: "",
        false: "transition-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      animated: true,
    },
  }
);
