import { cva } from "class-variance-authority";

export const clearButtonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all duration-200 cursor-pointer hover:bg-foreground/10 active:scale-90",
  {
    variants: {
      size: {
        sm: "h-4 w-4 p-0.5",
        md: "h-5 w-5 p-0.5",
        lg: "h-6 w-6 p-1",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const searchIconVariants = cva(
  "text-muted-foreground transition-colors duration-200",
  {
    variants: {
      size: {
        sm: "h-3.5 w-3.5",
        md: "h-4 w-4",
        lg: "h-5 w-5",
      },
      focused: {
        true: "text-primary",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      focused: false,
    },
  }
);
