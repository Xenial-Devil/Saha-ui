import { cva } from "class-variance-authority";
// Variants
const containerVariants = cva("relative w-full", {
  variants: {
    orientation: {
      horizontal: "h-auto",
      vertical: "w-auto h-full min-h-[200px]",
    },
    disabled: {
      true: "opacity-50 cursor-not-allowed",
      false: "",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    disabled: false,
  },
});

const trackVariants = cva(
  "relative rounded-full transition-all duration-300 shadow-inner",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-muted via-muted/80 to-muted",
        primary:
          "bg-gradient-to-r from-primary/15 via-primary/10 to-primary/15 shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)]",
        secondary:
          "bg-gradient-to-r from-secondary/15 via-secondary/10 to-secondary/15 shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)]",
        accent:
          "bg-gradient-to-r from-accent/20 via-accent/15 to-accent/20 shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)]",
        success:
          "bg-gradient-to-r from-success/15 via-success/10 to-success/15 shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)]",
        warning:
          "bg-gradient-to-r from-warning/15 via-warning/10 to-warning/15 shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)]",
        error:
          "bg-gradient-to-r from-danger/15 via-danger/10 to-danger/15 shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)]",
        ghost: "bg-gradient-to-r from-muted/40 via-muted/30 to-muted/40",
        glass:
          "bg-gradient-to-r from-background/20 via-background/30 to-background/20 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
      },
      orientation: {
        horizontal: "w-full",
        vertical: "h-full",
      },
    },
    compoundVariants: [
      // Horizontal sizes
      { orientation: "horizontal", size: "sm", className: "h-1.5" },
      { orientation: "horizontal", size: "md", className: "h-2.5" },
      { orientation: "horizontal", size: "lg", className: "h-4" },
      // Vertical sizes
      { orientation: "vertical", size: "sm", className: "w-1.5" },
      { orientation: "vertical", size: "md", className: "w-2.5" },
      { orientation: "vertical", size: "lg", className: "w-4" },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      orientation: "horizontal",
    },
  }
);

const filledTrackVariants = cva(
  "absolute rounded-full transition-all duration-300 ease-out",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-primary/90 via-primary to-primary/90 shadow-[0_0_12px_oklch(var(--primary)/0.4)]",
        primary:
          "bg-gradient-to-r from-primary/90 via-primary to-primary/90 shadow-[0_0_12px_oklch(var(--primary)/0.4)]",
        secondary:
          "bg-gradient-to-r from-secondary/90 via-secondary to-secondary/90 shadow-[0_0_12px_oklch(var(--secondary)/0.4)]",
        accent:
          "bg-gradient-to-r from-accent/90 via-accent to-accent/90 shadow-[0_0_14px_oklch(var(--accent)/0.5)]",
        success:
          "bg-gradient-to-r from-success/90 via-success to-success/90 shadow-[0_0_12px_oklch(var(--success)/0.4)]",
        warning:
          "bg-gradient-to-r from-warning/90 via-warning to-warning/90 shadow-[0_0_12px_oklch(var(--warning)/0.4)]",
        error:
          "bg-gradient-to-r from-danger/90 via-danger to-danger/90 shadow-[0_0_12px_oklch(var(--danger)/0.4)]",
        ghost:
          "bg-gradient-to-r from-foreground/50 via-foreground/60 to-foreground/50 shadow-[0_0_8px_oklch(var(--foreground)/0.2)]",
        glass:
          "bg-gradient-to-r from-primary/70 via-primary/80 to-primary/70 backdrop-blur-sm shadow-[0_0_12px_oklch(var(--primary)/0.3)]",
      },
      orientation: {
        horizontal: "h-full",
        vertical: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      orientation: "horizontal",
    },
  }
);

const thumbVariants = cva(
  [
    "absolute rounded-full border-2",
    "transition-all duration-300 ease-out",
    "cursor-grab active:cursor-grabbing",
    "hover:scale-110 active:scale-125",
    "focus:outline-none focus:ring-4 focus:ring-offset-2",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-primary/20 via-background to-primary/10 border-primary shadow-[0_0_16px_oklch(var(--primary)/0.5)] hover:shadow-[0_0_20px_oklch(var(--primary)/0.6)] active:shadow-[0_0_24px_oklch(var(--primary)/0.7)] focus:ring-primary/30",
        primary:
          "bg-gradient-to-br from-primary/20 via-background to-primary/10 border-primary shadow-[0_0_16px_oklch(var(--primary)/0.5)] hover:shadow-[0_0_20px_oklch(var(--primary)/0.6)] active:shadow-[0_0_24px_oklch(var(--primary)/0.7)] focus:ring-primary/30",
        secondary:
          "bg-gradient-to-br from-secondary/20 via-background to-secondary/10 border-secondary shadow-[0_0_16px_oklch(var(--secondary)/0.5)] hover:shadow-[0_0_20px_oklch(var(--secondary)/0.6)] active:shadow-[0_0_24px_oklch(var(--secondary)/0.7)] focus:ring-secondary/30",
        accent:
          "bg-gradient-to-br from-accent/25 via-background to-accent/15 border-accent shadow-[0_0_18px_oklch(var(--accent)/0.6)] hover:shadow-[0_0_24px_oklch(var(--accent)/0.7)] active:shadow-[0_0_28px_oklch(var(--accent)/0.8)] focus:ring-accent/35",
        success:
          "bg-gradient-to-br from-success/20 via-background to-success/10 border-success shadow-[0_0_16px_oklch(var(--success)/0.5)] hover:shadow-[0_0_20px_oklch(var(--success)/0.6)] active:shadow-[0_0_24px_oklch(var(--success)/0.7)] focus:ring-success/30",
        warning:
          "bg-gradient-to-br from-warning/20 via-background to-warning/10 border-warning shadow-[0_0_16px_oklch(var(--warning)/0.5)] hover:shadow-[0_0_20px_oklch(var(--warning)/0.6)] active:shadow-[0_0_24px_oklch(var(--warning)/0.7)] focus:ring-warning/30",
        error:
          "bg-gradient-to-br from-danger/20 via-background to-danger/10 border-danger shadow-[0_0_16px_oklch(var(--danger)/0.5)] hover:shadow-[0_0_20px_oklch(var(--danger)/0.6)] active:shadow-[0_0_24px_oklch(var(--danger)/0.7)] focus:ring-danger/30",
        ghost:
          "bg-gradient-to-br from-foreground/15 via-background to-foreground/8 border-foreground/60 shadow-[0_0_12px_oklch(var(--foreground)/0.3)] hover:shadow-[0_0_16px_oklch(var(--foreground)/0.4)] active:shadow-[0_0_20px_oklch(var(--foreground)/0.5)] focus:ring-foreground/20",
        glass:
          "bg-gradient-to-br from-primary/15 via-background/80 to-primary/10 border-primary/80 backdrop-blur-sm shadow-[0_0_14px_oklch(var(--primary)/0.4)] hover:shadow-[0_0_18px_oklch(var(--primary)/0.5)] active:shadow-[0_0_22px_oklch(var(--primary)/0.6)] focus:ring-primary/25",
      },
      size: {
        sm: "w-3 h-3",
        md: "w-4 h-4",
        lg: "w-5 h-5",
      },
      disabled: {
        true: "cursor-not-allowed hover:scale-100 active:scale-100 opacity-50 shadow-none",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      disabled: false,
    },
  }
);

const tooltipVariants = cva(
  [
    "absolute whitespace-nowrap px-2.5 py-1.5 text-xs font-semibold",
    "bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90 text-background rounded-md",
    "shadow-[0_0_16px_oklch(var(--foreground)/0.4)]",
    "transition-all duration-300 ease-out",
    "pointer-events-none",
    "border border-background/10",
  ],
  {
    variants: {
      orientation: {
        horizontal: "-top-10 left-1/2 -translate-x-1/2",
        vertical: "-left-14 top-1/2 -translate-y-1/2",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

const markVariants = cva(
  "absolute w-1 h-1 rounded-full bg-foreground/50 shadow-[0_0_4px_oklch(var(--foreground)/0.3)] transition-all duration-200 hover:bg-foreground/70 hover:shadow-[0_0_6px_oklch(var(--foreground)/0.5)]",
  {
    variants: {
      orientation: {
        horizontal: "top-1/2 -translate-y-1/2",
        vertical: "left-1/2 -translate-x-1/2",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

const markLabelVariants = cva(
  "absolute text-xs font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground",
  {
    variants: {
      orientation: {
        horizontal: "top-full mt-2 left-1/2 -translate-x-1/2",
        vertical: "left-full ml-2 top-1/2 -translate-y-1/2",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

const labelVariants = cva("block mb-2 font-medium text-foreground", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
    required: {
      true: "after:content-['*'] after:ml-1 after:text-danger",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    required: false,
  },
});
export {
  containerVariants,
  trackVariants,
  thumbVariants,
  tooltipVariants,
  markVariants,
  markLabelVariants,
  labelVariants,
  filledTrackVariants,
};