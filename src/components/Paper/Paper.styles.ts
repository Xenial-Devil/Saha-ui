import { cva } from "class-variance-authority";

export const paperVariants = cva(
  "relative transition-all duration-300 bg-background",
  {
    variants: {
      variant: {
        filled: "bg-background border-0",
        outlined: "bg-background border border-border",
        gradient: "bg-gradient-to-br from-background to-muted/30 border-0",
        glass: "backdrop-blur-lg bg-background/80 border border-white/20",
      },
      elevation: {
        0: "shadow-none",
        1: "shadow-sm hover:shadow-md",
        2: "shadow-md hover:shadow-lg",
        3: "shadow-lg hover:shadow-xl",
        4: "shadow-xl hover:shadow-2xl",
        5: "shadow-2xl hover:shadow-2xl",
        6: "shadow-2xl drop-shadow-2xl hover:shadow-2xl hover:drop-shadow-2xl",
      },
      padding: {
        none: "p-0",
        sm: "p-3",
        md: "p-4 sm:p-6",
        lg: "p-6 sm:p-8",
        xl: "p-8 sm:p-10",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
      hoverable: {
        true: "cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]",
        false: "",
      },
      centered: {
        true: "mx-auto",
        false: "",
      },
      maxWidth: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        full: "max-w-full",
      },
    },
    compoundVariants: [
      // Enhanced shadows for filled variant
      {
        variant: "filled",
        elevation: 1,
        className: "shadow-sm shadow-gray-200 dark:shadow-gray-900",
      },
      {
        variant: "filled",
        elevation: 2,
        className: "shadow-md shadow-gray-200 dark:shadow-gray-900",
      },
      {
        variant: "filled",
        elevation: 3,
        className: "shadow-lg shadow-gray-200 dark:shadow-gray-900",
      },
      {
        variant: "filled",
        elevation: 4,
        className: "shadow-xl shadow-gray-200/50 dark:shadow-gray-900/50",
      },
      {
        variant: "filled",
        elevation: 5,
        className: "shadow-2xl shadow-gray-200/50 dark:shadow-gray-900/50",
      },
      {
        variant: "filled",
        elevation: 6,
        className: "shadow-2xl drop-shadow-2xl shadow-gray-300/60 dark:shadow-gray-900/60",
      },
      // Glass variant with elevation
      {
        variant: "glass",
        elevation: 1,
        className: "shadow-sm shadow-black/5",
      },
      {
        variant: "glass",
        elevation: 2,
        className: "shadow-md shadow-black/10",
      },
      {
        variant: "glass",
        elevation: 3,
        className: "shadow-lg shadow-black/15",
      },
      {
        variant: "glass",
        elevation: 4,
        className: "shadow-xl shadow-black/20",
      },
      {
        variant: "glass",
        elevation: 5,
        className: "shadow-2xl shadow-black/25",
      },
      {
        variant: "glass",
        elevation: 6,
        className: "shadow-2xl drop-shadow-2xl shadow-black/30",
      },
      // Gradient variant with elevation
      {
        variant: "gradient",
        elevation: 1,
        className: "shadow-sm shadow-primary/5",
      },
      {
        variant: "gradient",
        elevation: 2,
        className: "shadow-md shadow-primary/10",
      },
      {
        variant: "gradient",
        elevation: 3,
        className: "shadow-lg shadow-primary/15",
      },
      {
        variant: "gradient",
        elevation: 4,
        className: "shadow-xl shadow-primary/20",
      },
      {
        variant: "gradient",
        elevation: 5,
        className: "shadow-2xl shadow-primary/25",
      },
      {
        variant: "gradient",
        elevation: 6,
        className: "shadow-2xl drop-shadow-2xl shadow-primary/30",
      },
      // Outlined variant with hoverable
      {
        variant: "outlined",
        hoverable: true,
        className: "hover:border-primary/50 hover:bg-muted/20",
      },
      // Glass variant with hoverable
      {
        variant: "glass",
        hoverable: true,
        className: "hover:bg-background/90 hover:border-white/30",
      },
      // Gradient variant with hoverable
      {
        variant: "gradient",
        hoverable: true,
        className: "hover:from-background hover:to-muted/50",
      },
    ],
    defaultVariants: {
      variant: "filled",
      elevation: 1,
      padding: "md",
      rounded: "md",
      hoverable: false,
      centered: false,
    },
  }
);
