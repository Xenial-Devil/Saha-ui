import { cva } from "class-variance-authority";

export const notificationContainerVariants = cva(
  "fixed z-[9999] flex flex-col pointer-events-none gap-3 outline-none",
  {
    variants: {
      position: {
        "top-left": "top-0 left-0 p-4 items-start",
        "top-center": "top-0 left-1/2 -translate-x-1/2 p-4 items-center",
        "top-right": "top-0 right-0 p-4 items-end",
        "bottom-left": "bottom-0 left-0 p-4 items-start flex-col-reverse",
        "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 p-4 items-center flex-col-reverse",
        "bottom-right": "bottom-0 right-0 p-4 items-end flex-col-reverse",
      }
    },
    defaultVariants: {
      position: "top-right"
    }
  }
);

export const notificationVariants = cva(
  "pointer-events-auto relative flex w-full max-w-sm flex-col gap-1 overflow-hidden rounded-xl border p-4 shadow-lg transition-all",
  {
    variants: {
      variant: {
        info: "bg-background border-border text-foreground",
        success: "bg-success/10 border-success/20 text-success-foreground",
        warning: "bg-warning/10 border-warning/20 text-warning-foreground",
        error: "bg-destructive border-destructive text-destructive-foreground",
      }
    },
    defaultVariants: {
      variant: "info"
    }
  }
);
