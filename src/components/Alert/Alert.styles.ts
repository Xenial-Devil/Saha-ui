import { cva } from "class-variance-authority";

export const alertVariants = cva(
  "relative w-full p-4 transition-all duration-300 ease-out overflow-hidden isolate group hover:scale-[1.01] hover:shadow-2xl",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border border-border",
        solid:
          "shadow-lg shadow-current/20 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-50 after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/5 after:to-transparent hover:shadow-current/30",
        subtle:
          "backdrop-blur-sm bg-opacity-10 border border-current/20 shadow-md shadow-current/10 hover:border-current/40 hover:bg-opacity-15 hover:shadow-current/20",
        "left-accent":
          "border-l-4 bg-opacity-10 backdrop-blur-sm shadow-md shadow-current/10 before:absolute before:left-0 before:inset-y-0 before:w-1 before:bg-gradient-to-b before:from-transparent before:via-current before:to-transparent after:absolute after:left-0 after:top-0 after:bottom-0 after:w-0.5 after:bg-current/50 after:blur-sm hover:shadow-lg hover:shadow-current/20",
        "top-accent":
          "border-t-4 bg-opacity-10 backdrop-blur-sm shadow-md shadow-current/10 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-transparent before:via-current before:to-transparent after:absolute after:top-0 after:left-0 after:right-0 after:h-0.5 after:bg-current/50 after:blur-sm hover:shadow-lg hover:shadow-current/20",
        outline:
          "bg-card/50 backdrop-blur-sm border-2 border-current/30 shadow-md shadow-current/10 hover:border-current/50 hover:shadow-lg hover:shadow-current/25 hover:bg-card/70",
        glass:
          "bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/10 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_50%)] after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-700 hover:border-white/30 hover:shadow-current/30",
      },
      status: {
        info: "",
        success: "",
        warning: "",
        danger: "",
      },
      rounded: {
        true: "rounded-xl",
        false: "rounded-none",
      },
    },
    compoundVariants: [
      // Solid variant colors
      {
        variant: "solid",
        status: "info",
        className: "bg-info text-info-foreground",
      },
      {
        variant: "solid",
        status: "success",
        className: "bg-success text-success-foreground",
      },
      {
        variant: "solid",
        status: "warning",
        className: "bg-warning text-warning-foreground",
      },
      {
        variant: "solid",
        status: "danger",
        className: "bg-destructive text-destructive-foreground",
      },
      // Subtle variant colors
      {
        variant: "subtle",
        status: "info",
        className: "bg-info/10 text-info border-info/20",
      },
      {
        variant: "subtle",
        status: "success",
        className: "bg-success/10 text-success border-success/20",
      },
      {
        variant: "subtle",
        status: "warning",
        className: "bg-warning/10 text-warning border-warning/20",
      },
      {
        variant: "subtle",
        status: "danger",
        className: "bg-destructive/10 text-destructive border-destructive/20",
      },
      // Left-accent variant colors
      {
        variant: "left-accent",
        status: "info",
        className: "bg-info/5 text-foreground border-info",
      },
      {
        variant: "left-accent",
        status: "success",
        className: "bg-success/5 text-foreground border-success",
      },
      {
        variant: "left-accent",
        status: "warning",
        className: "bg-warning/5 text-foreground border-warning",
      },
      {
        variant: "left-accent",
        status: "danger",
        className: "bg-destructive/5 text-foreground border-destructive",
      },
      // Top-accent variant colors
      {
        variant: "top-accent",
        status: "info",
        className: "bg-info/5 text-foreground border-info",
      },
      {
        variant: "top-accent",
        status: "success",
        className: "bg-success/5 text-foreground border-success",
      },
      {
        variant: "top-accent",
        status: "warning",
        className: "bg-warning/5 text-foreground border-warning",
      },
      {
        variant: "top-accent",
        status: "danger",
        className: "bg-destructive/5 text-foreground border-destructive",
      },
      // Outline variant colors
      {
        variant: "outline",
        status: "info",
        className: "border-info/30 text-foreground hover:border-info/50",
      },
      {
        variant: "outline",
        status: "success",
        className: "border-success/30 text-foreground hover:border-success/50",
      },
      {
        variant: "outline",
        status: "warning",
        className: "border-warning/30 text-foreground hover:border-warning/50",
      },
      {
        variant: "outline",
        status: "danger",
        className:
          "border-destructive/30 text-foreground hover:border-destructive/50",
      },
      // Glass variant colors
      {
        variant: "glass",
        status: "info",
        className: "text-info",
      },
      {
        variant: "glass",
        status: "success",
        className: "text-success",
      },
      {
        variant: "glass",
        status: "warning",
        className: "text-warning",
      },
      {
        variant: "glass",
        status: "danger",
        className: "text-destructive",
      },
    ],
    defaultVariants: {
      variant: "default",
      status: "info",
      rounded: true,
    },
  }
);
