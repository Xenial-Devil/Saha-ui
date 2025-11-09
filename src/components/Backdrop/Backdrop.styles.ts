import { cva } from "class-variance-authority";

export const backdropVariants = cva(
  "fixed inset-0 flex items-center justify-center transition-all",
  {
    variants: {
      variant: {
        solid: "bg-black/50",
        blur: "backdrop-blur",
        gradient: "bg-gradient-to-b from-black/60 via-black/50 to-black/60",
      },
      blur: {
        none: "",
        sm: "backdrop-blur-sm",
        md: "backdrop-blur-md",
        lg: "backdrop-blur-lg",
        xl: "backdrop-blur-xl",
      },
      invisible: {
        true: "bg-transparent backdrop-blur-none",
        false: "",
      },
      open: {
        true: "opacity-100 pointer-events-auto",
        false: "opacity-0 pointer-events-none",
      },
    },
    compoundVariants: [
      // Blur variant with blur levels
      {
        variant: "blur",
        blur: "none",
        className: "bg-black/30",
      },
      {
        variant: "blur",
        blur: "sm",
        className: "bg-black/20",
      },
      {
        variant: "blur",
        blur: "md",
        className: "bg-black/15",
      },
      {
        variant: "blur",
        blur: "lg",
        className: "bg-black/10",
      },
      {
        variant: "blur",
        blur: "xl",
        className: "bg-black/5",
      },
      // Override blur when invisible
      {
        invisible: true,
        blur: "sm",
        className: "backdrop-blur-none",
      },
      {
        invisible: true,
        blur: "md",
        className: "backdrop-blur-none",
      },
      {
        invisible: true,
        blur: "lg",
        className: "backdrop-blur-none",
      },
      {
        invisible: true,
        blur: "xl",
        className: "backdrop-blur-none",
      },
    ],
    defaultVariants: {
      variant: "solid",
      blur: "none",
      invisible: false,
      open: false,
    },
  }
);

export const backdropContentVariants = cva(
  "relative z-10 pointer-events-none",
  {
    variants: {
      open: {
        true: "animate-in fade-in zoom-in-95 duration-300",
        false: "animate-out fade-out zoom-out-95 duration-200",
      },
    },
    defaultVariants: {
      open: false,
    },
  }
);
