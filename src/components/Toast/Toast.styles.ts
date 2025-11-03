import { cva } from "class-variance-authority";
// CVA variants for Toast - Clean, Thin, and Beautiful Design
const toastVariants = cva(
  "relative flex items-center gap-3 px-4 py-3 min-w-[300px] max-w-[450px] shadow-lg transition-all duration-300 ease-out overflow-hidden pointer-events-auto rounded-xl border-2",
  {
    variants: {
      variant: {
        solid: "shadow-md border-transparent",
        subtle: "backdrop-blur-md border-current/30 shadow-md",
        outline: "bg-card backdrop-blur-sm shadow-xl dark:bg-card",
        glass: "bg-background/40 backdrop-blur-xl border-white/20 shadow-xl",
      },
      status: {
        info: "",
        success: "",
        warning: "",
        danger: "",
      },
      animation: {
        slide: "",
        fade: "",
        scale: "",
        bounce: "",
      },
    },
    compoundVariants: [
      // Solid variant - clean solid colors
      {
        variant: "solid",
        status: "info",
        className: "bg-info text-info-foreground border-info",
      },
      {
        variant: "solid",
        status: "success",
        className: "bg-success text-success-foreground border-success",
      },
      {
        variant: "solid",
        status: "warning",
        className: "bg-warning text-warning-foreground border-warning",
      },
      {
        variant: "solid",
        status: "danger",
        className: "bg-danger text-danger-foreground border-danger",
      },
      // Subtle variant - Better contrast
      {
        variant: "subtle",
        status: "info",
        className:
          "bg-info/15 text-info border-info/40 dark:bg-info/25 dark:text-info-foreground dark:border-info/50",
      },
      {
        variant: "subtle",
        status: "success",
        className:
          "bg-success/15 text-success border-success/40 dark:bg-success/25 dark:text-success-foreground dark:border-success/50",
      },
      {
        variant: "subtle",
        status: "warning",
        className:
          "bg-warning/15 text-warning border-warning/40 dark:bg-warning/25 dark:text-warning-foreground dark:border-warning/50",
      },
      {
        variant: "subtle",
        status: "danger",
        className:
          "bg-danger/15 text-danger border-danger/40 dark:bg-danger/25 dark:text-danger-foreground dark:border-danger/50",
      },
      // Outline variant - Much better visibility with strong borders
      {
        variant: "outline",
        status: "info",
        className:
          "border-info/90 text-info bg-info/5 dark:bg-info/15 dark:border-info dark:text-info-foreground shadow-info/20",
      },
      {
        variant: "outline",
        status: "success",
        className:
          "border-success/90 text-success bg-success/5 dark:bg-success/15 dark:border-success dark:text-success-foreground shadow-success/20",
      },
      {
        variant: "outline",
        status: "warning",
        className:
          "border-warning/90 text-warning bg-warning/5 dark:bg-warning/15 dark:border-warning dark:text-warning-foreground shadow-warning/20",
      },
      {
        variant: "outline",
        status: "danger",
        className:
          "border-danger/90 text-danger bg-danger/5 dark:bg-danger/15 dark:border-danger dark:text-danger-foreground shadow-danger/20",
      },
      // Glass variant - Better visibility with stronger borders and backgrounds
      {
        variant: "glass",
        status: "info",
        className:
          "text-info border-info/40 bg-info/10 dark:border-info/50 dark:bg-info/15",
      },
      {
        variant: "glass",
        status: "success",
        className:
          "text-success border-success/40 bg-success/10 dark:border-success/50 dark:bg-success/15",
      },
      {
        variant: "glass",
        status: "warning",
        className:
          "text-warning border-warning/40 bg-warning/10 dark:border-warning/50 dark:bg-warning/15",
      },
      {
        variant: "glass",
        status: "danger",
        className:
          "text-danger border-danger/40 bg-danger/10 dark:border-danger/50 dark:bg-danger/15",
      },
    ],
    defaultVariants: {
      variant: "solid",
      status: "info",
      animation: "slide",
    },
  }
);
export { toastVariants };