import { cva } from "class-variance-authority";

export const appBarVariants = cva(
  "w-full transition-all duration-300",
  {
    variants: {
      position: {
        static: "relative",
        fixed: "fixed top-0 left-0 right-0",
        sticky: "sticky top-0",
        absolute: "absolute top-0 left-0 right-0",
      },
      variant: {
        default: "bg-background border-b border-border",
        elevated: "bg-background shadow-md",
        outlined: "bg-background border-b-2 border-border",
        transparent: "bg-transparent",
      },
      color: {
        default: "",
        primary: "",
        secondary: "",
        transparent: "bg-transparent",
      },
      elevation: {
        0: "shadow-none",
        1: "shadow-sm",
        2: "shadow-md",
        3: "shadow-lg",
        4: "shadow-xl",
      },
      size: {
        sm: "h-14",
        md: "h-16",
        lg: "h-20",
      },
      blur: {
        true: "backdrop-blur-md bg-opacity-80 dark:bg-opacity-80",
        false: "",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    compoundVariants: [
      // Primary color variants
      {
        color: "primary",
        variant: "default",
        className: "bg-primary text-primary-foreground border-primary/20",
      },
      {
        color: "primary",
        variant: "elevated",
        className: "bg-primary text-primary-foreground shadow-primary/20",
      },
      {
        color: "primary",
        variant: "outlined",
        className: "bg-primary text-primary-foreground border-primary-foreground/20",
      },
      // Secondary color variants
      {
        color: "secondary",
        variant: "default",
        className: "bg-secondary text-secondary-foreground border-secondary/20",
      },
      {
        color: "secondary",
        variant: "elevated",
        className: "bg-secondary text-secondary-foreground shadow-secondary/20",
      },
      {
        color: "secondary",
        variant: "outlined",
        className: "bg-secondary text-secondary-foreground border-secondary-foreground/20",
      },
      // Transparent with blur
      {
        variant: "transparent",
        blur: true,
        className: "backdrop-blur-lg bg-background/70 dark:bg-background/70",
      },
    ],
    defaultVariants: {
      position: "static",
      variant: "default",
      color: "default",
      elevation: 2,
      size: "md",
      blur: false,
      fullWidth: true,
    },
  }
);

export const appBarContentVariants = cva(
  "h-full flex items-center transition-all duration-300",
  {
    variants: {
      centered: {
        true: "justify-center",
        false: "justify-between",
      },
      maxWidth: {
        sm: "max-w-sm mx-auto px-4",
        md: "max-w-md mx-auto px-4",
        lg: "max-w-lg mx-auto px-4",
        xl: "max-w-xl mx-auto px-6",
        "2xl": "max-w-2xl mx-auto px-6",
        full: "max-w-full px-6",
      },
    },
    defaultVariants: {
      centered: false,
      maxWidth: "full",
    },
  }
);

export const appBarScrollVariants = cva(
  "transition-transform duration-300",
  {
    variants: {
      hidden: {
        true: "-translate-y-full",
        false: "translate-y-0",
      },
    },
    defaultVariants: {
      hidden: false,
    },
  }
);
