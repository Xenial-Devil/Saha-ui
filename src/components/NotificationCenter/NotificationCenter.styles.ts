import { cva } from "class-variance-authority";

export const notificationPanelVariants = cva(
  "flex flex-col overflow-hidden rounded-2xl border shadow-2xl transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-card border-border/50 shadow-black/10 dark:shadow-black/30",
        glass: "bg-white/10 dark:bg-black/10 backdrop-blur-2xl border-white/20 shadow-black/15",
        outline: "bg-card border-2 border-border shadow-sm",
      },
      size: {
        sm: "w-[300px]",
        md: "w-[360px]",
        lg: "w-[420px]",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

export const notificationHeaderVariants = cva(
  "flex items-center justify-between px-4 py-3 border-b",
  {
    variants: {
      variant: {
        default: "border-border/50",
        glass: "border-white/10",
        outline: "border-border",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export const notificationItemVariants = cva(
  "flex items-start gap-3 px-4 py-3 transition-all duration-200 cursor-pointer hover:bg-foreground/5 border-b last:border-b-0",
  {
    variants: {
      read: {
        true: "opacity-60",
        false: "bg-primary/5",
      },
      variant: {
        default: "border-border/30",
        glass: "border-white/5",
        outline: "border-border/30",
      },
    },
    defaultVariants: { read: false, variant: "default" },
  }
);

export const notificationDotVariants = cva(
  "absolute top-0 right-0 rounded-full border-2 border-card animate-pulse",
  {
    variants: {
      size: {
        sm: "h-2 w-2",
        md: "h-2.5 w-2.5",
        lg: "h-3 w-3",
      },
      hasUnread: {
        true: "bg-destructive",
        false: "hidden",
      },
    },
    defaultVariants: { size: "md", hasUnread: false },
  }
);

export const notificationBellVariants = cva(
  "relative inline-flex items-center justify-center rounded-xl text-foreground hover:bg-foreground/10 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  {
    variants: {
      size: {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export const typeDotVariants = cva("h-2 w-2 rounded-full shrink-0 mt-1.5", {
  variants: {
    type: {
      default: "bg-muted-foreground",
      info: "bg-info",
      success: "bg-success",
      warning: "bg-warning",
      error: "bg-destructive",
    },
  },
  defaultVariants: { type: "default" },
});
