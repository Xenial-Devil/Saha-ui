import { cva } from "class-variance-authority";
/**
 * CVA variants for Spinner
 */
const spinnerVariants = cva(
  "inline-block rounded-full border-solid border-t-transparent border-r-transparent",
  {
    variants: {
      variant: {
        default:
          "border-l-foreground/80 border-b-foreground/80 shadow-[0_0_12px_0] shadow-foreground/20",
        primary:
          "border-l-primary border-b-primary shadow-[0_0_12px_0] shadow-primary/40",
        secondary:
          "border-l-secondary border-b-secondary shadow-[0_0_12px_0] shadow-secondary/40",
        accent:
          "border-l-accent border-b-accent shadow-[0_0_12px_0] shadow-accent/40",
        info: "border-l-info border-b-info shadow-[0_0_12px_0] shadow-info/40",
        success:
          "border-l-success border-b-success shadow-[0_0_12px_0] shadow-success/40",
        warning:
          "border-l-warning border-b-warning shadow-[0_0_12px_0] shadow-warning/40",
        error:
          "border-l-destructive border-b-destructive shadow-[0_0_12px_0] shadow-destructive/40",
        glass:
          "border-l-primary/60 border-b-primary/60 backdrop-blur-xl bg-background/10 shadow-[0_8px_32px_0] shadow-primary/20",
        gradient:
          "border-l-transparent border-b-transparent bg-gradient-to-tr from-primary via-accent to-secondary bg-clip-border shadow-[0_0_16px_0] shadow-primary/50",
      },
      size: {
        xs: "w-4 h-4",
        sm: "w-6 h-6",
        md: "w-10 h-10",
        lg: "w-16 h-16",
        xl: "w-24 h-24",
        "2xl": "w-32 h-32",
        "3xl": "w-40 h-40",
        "4xl": "w-48 h-48",
      },
      thickness: {
        thin: "border-2",
        default: "border-4",
        thick: "border-[6px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      thickness: "default",
    },
  }
);
/**
 * Container variants for wrapper
 */
const containerVariants = cva(
  "flex flex-col items-center justify-center gap-3",
  {
    variants: {
      fullscreen: {
        true: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
        false: "inline-flex",
      },
    },
    defaultVariants: {
      fullscreen: false,
    },
  }
);

/**
 * Label text variants
 */
const labelVariants = cva("text-sm font-medium animate-pulse", {
  variants: {
    variant: {
      default: "text-foreground/80",
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
      info: "text-info",
      success: "text-success",
      warning: "text-warning",
      error: "text-destructive",
      glass: "text-primary/80",
      gradient:
        "bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

/**
 * Logo size variants relative to spinner size
 */
const logoSizeVariants = cva(
  "absolute inset-0 flex items-center justify-center",
  {
    variants: {
      logoSize: {
        xs: "[&>*]:w-[25%] [&>*]:h-[25%] [&>img]:w-[25%] [&>img]:h-[25%]",
        sm: "[&>*]:w-[35%] [&>*]:h-[35%] [&>img]:w-[35%] [&>img]:h-[35%]",
        md: "[&>*]:w-[50%] [&>*]:h-[50%] [&>img]:w-[50%] [&>img]:h-[50%]",
        lg: "[&>*]:w-[65%] [&>*]:h-[65%] [&>img]:w-[65%] [&>img]:h-[65%]",
        xl: "[&>*]:w-[80%] [&>*]:h-[80%] [&>img]:w-[80%] [&>img]:h-[80%]",
      },
    },
    defaultVariants: {
      logoSize: "md",
    },
  }
);
export { spinnerVariants, containerVariants, labelVariants, logoSizeVariants };
