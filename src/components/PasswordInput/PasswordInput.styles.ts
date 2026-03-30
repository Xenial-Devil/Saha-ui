import { cva } from "class-variance-authority";

export const strengthBarContainerVariants = cva(
  "flex gap-1 mt-2 h-1.5 rounded-full overflow-hidden",
  {
    variants: {
      size: {
        sm: "h-1",
        md: "h-1.5",
        lg: "h-2",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const strengthBarSegmentVariants = cva(
  "flex-1 rounded-full transition-all duration-500 ease-out",
  {
    variants: {
      active: {
        true: "",
        false: "bg-border/40",
      },
      strength: {
        weak: "bg-destructive",
        fair: "bg-warning",
        good: "bg-info",
        strong: "bg-success",
      },
    },
    defaultVariants: {
      active: false,
      strength: "weak",
    },
  }
);

export const strengthLabelVariants = cva(
  "text-xs font-medium mt-1 transition-colors duration-300",
  {
    variants: {
      strength: {
        weak: "text-destructive",
        fair: "text-warning",
        good: "text-info",
        strong: "text-success",
      },
    },
    defaultVariants: {
      strength: "weak",
    },
  }
);

export const toggleButtonVariants = cva(
  "inline-flex items-center justify-center rounded-md p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors duration-200 cursor-pointer",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);
