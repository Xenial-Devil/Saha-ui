import { cva } from "class-variance-authority";

export const accordionVariants = cva(
  "w-full space-y-0 rounded-2xl overflow-hidden transition-all duration-300 relative isolate hover:shadow-2xl",
  {
    variants: {
      variant: {
        default:
          "border border-border/50 shadow-lg backdrop-blur-sm bg-card/30 hover:border-primary/30 before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:via-transparent before:to-accent/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        controlled:
          "border border-border/50 shadow-lg backdrop-blur-sm bg-card/30 hover:border-primary/30 before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:via-transparent before:to-accent/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        allopen:
          "border border-border/50 shadow-lg backdrop-blur-sm bg-card/30 hover:border-primary/30 before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:via-transparent before:to-accent/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        toggle:
          "border border-border/50 shadow-lg backdrop-blur-sm bg-card/30 hover:border-primary/30 before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:via-transparent before:to-accent/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        firstopen:
          "border border-border/50 shadow-lg backdrop-blur-sm bg-card/30 hover:border-primary/30 before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:via-transparent before:to-accent/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        glass:
          "bg-background/30 backdrop-blur-xl border border-white/10 shadow-2xl hover:border-white/20 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
      },
      size: {
        sm: "rounded-xl",
        md: "rounded-2xl",
        lg: "rounded-3xl",
      },
      orientation: {
        vertical: "flex flex-col",
        horizontal: "flex flex-row",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      orientation: "vertical",
    },
  }
);

export const accordionItemVariants = cva(
  "group relative w-full overflow-hidden transition-all duration-300 ease-out backdrop-blur-sm shadow-sm hover:shadow-lg transition-shadow isolate before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-primary/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
  {
    variants: {
      isOpen: {
        true: "bg-card/50 shadow-md before:opacity-100",
        false: "bg-card/30 hover:bg-card/40",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none",
        false: "",
      },
      orientation: {
        vertical: "border-b border-border/30 last:border-b-0",
        horizontal: "border-r border-border/30 last:border-r-0 flex-1",
      },
    },
    defaultVariants: {
      isOpen: false,
      disabled: false,
      orientation: "vertical",
    },
  }
);

export const accordionHeaderVariants = cva(
  "w-full flex justify-between items-center cursor-pointer transition-all duration-300 gap-4 relative isolate hover:scale-[1.01] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      isOpen: {
        true: "bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border-b border-border/50 shadow-sm before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/10 before:via-transparent before:to-accent/10 before:opacity-50",
        false:
          "hover:bg-muted/30 after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-muted/20 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-4 text-base",
        lg: "px-8 py-6 text-lg",
      },
      iconPosition: {
        left: "flex-row-reverse",
        right: "flex-row",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "",
      },
    },
    defaultVariants: {
      isOpen: false,
      size: "md",
      iconPosition: "right",
      disabled: false,
    },
  }
);

export const accordionContentVariants = cva(
  "w-full overflow-hidden bg-card/20",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const accordionContentInnerVariants = cva(
  "text-muted-foreground leading-relaxed transition-all duration-300",
  {
    variants: {
      isOpen: {
        true: "translate-y-0 opacity-100",
        false: "translate-y-2 opacity-0",
      },
      size: {
        sm: "px-4 py-2",
        md: "px-6 py-4",
        lg: "px-8 py-6",
      },
    },
    defaultVariants: {
      isOpen: false,
      size: "md",
    },
  }
);

export const accordionIconVariants = cva(
  "relative shrink-0 transition-all duration-500 ease-out",
  {
    variants: {
      isOpen: {
        true: "rotate-180 text-primary",
        false: "rotate-0 text-muted-foreground group-hover:text-foreground",
      },
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      isOpen: false,
      size: "md",
    },
  }
);
