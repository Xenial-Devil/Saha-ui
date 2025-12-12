import { cva } from "class-variance-authority";
const emptyVariants = cva(
  "flex flex-col items-center justify-center text-center transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        subtle: "bg-muted/30 rounded-2xl border border-border/50",
        outlined: "bg-card rounded-2xl border-2 border-border",
        glass:
          "bg-background/50 backdrop-blur-xl rounded-2xl border border-border/30",
      },
      size: {
        xs: "p-4 gap-2",
        sm: "p-6 gap-3",
        md: "p-8 gap-4",
        lg: "p-12 gap-5",
        xl: "p-16 gap-6",
        "2xl": "p-20 gap-7",
        "3xl": "p-24 gap-8",
        "4xl": "p-32 gap-10",
      },
      fullHeight: {
        true: "min-h-[400px]",
        false: "",
      },
      animated: {
        true: "animate-in fade-in-50 zoom-in-95 duration-500",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      fullHeight: false,
      animated: true,
    },
  }
);

const iconContainerVariants = cva(
  "flex items-center justify-center rounded-full transition-all duration-300",
  {
    variants: {
      size: {
        xs: "w-12 h-12",
        sm: "w-16 h-16",
        md: "w-20 h-20",
        lg: "w-24 h-24",
        xl: "w-32 h-32",
        "2xl": "w-40 h-40",
        "3xl": "w-48 h-48",
        "4xl": "w-56 h-56",
      },
      iconColor: {
        primary: "bg-primary/10 text-primary",
        secondary: "bg-secondary/10 text-secondary",
        muted: "bg-muted text-muted-foreground",
        success: "bg-success/10 text-success",
        warning: "bg-warning/10 text-warning",
        danger: "bg-danger/10 text-danger",
        info: "bg-info/10 text-info",
      },
      animated: {
        true: "hover:scale-110 hover:rotate-3",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      iconColor: "muted",
      animated: true,
    },
  }
);

const titleVariants = cva("font-semibold text-foreground", {
  variants: {
    size: {
      xs: "text-sm",
      sm: "text-base",
      md: "text-lg",
      lg: "text-xl",
      xl: "text-2xl",
      "2xl": "text-3xl",
      "3xl": "text-4xl",
      "4xl": "text-5xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const descriptionVariants = cva("text-muted-foreground max-w-md", {
  variants: {
    size: {
      xs: "text-[10px]",
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
      xl: "text-lg",
      "2xl": "text-xl",
      "3xl": "text-2xl",
      "4xl": "text-3xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});
export {
  emptyVariants,
  iconContainerVariants,
  titleVariants,
  descriptionVariants,
};
