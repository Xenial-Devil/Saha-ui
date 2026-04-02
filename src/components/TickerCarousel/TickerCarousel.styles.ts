import { cva } from "class-variance-authority";

const tickerCarouselVariants = cva("relative w-full", {
  variants: {
    variant: {
      default: "rounded-none",
      contained: "max-w-7xl mx-auto",
      bordered: "rounded-xl border-2 border-border shadow-lg",
      glass:
        "rounded-xl border border-border/30 bg-background/5 backdrop-blur-sm shadow-2xl",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const tickerViewportVariants = cva("relative w-full overflow-hidden");

const tickerRowsVariants = cva("relative flex flex-col");

const tickerRowVariants = cva("relative w-full overflow-hidden");

const tickerTrackVariants = cva(
  "flex w-max will-change-transform motion-reduce:transform-none",
);

const tickerItemVariants = cva("shrink-0", {
  variants: {
    itemVariant: {
      default: "",
      bordered: "",
      soft: "",
      ghost: "",
      elevated: "",
    },
  },
  defaultVariants: {
    itemVariant: "default",
  },
});

const tickerCardVariants = cva(
  "relative overflow-hidden rounded-xl border transition-all duration-300 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
  {
    variants: {
      itemVariant: {
        default: "border-border bg-card text-card-foreground shadow-sm",
        bordered: "border-border bg-background text-foreground shadow-md",
        soft: "border-transparent bg-muted text-foreground shadow-sm",
        ghost: "border-transparent bg-transparent text-foreground shadow-none",
        elevated: "border-border bg-card text-card-foreground shadow-xl",
      },
    },
    defaultVariants: {
      itemVariant: "default",
    },
  },
);

const edgeFadeVariants = cva(
  "pointer-events-none absolute top-0 z-10 h-full w-16 sm:w-20",
);

export {
  tickerCarouselVariants,
  tickerViewportVariants,
  tickerRowsVariants,
  tickerRowVariants,
  tickerTrackVariants,
  tickerItemVariants,
  tickerCardVariants,
  edgeFadeVariants,
};
