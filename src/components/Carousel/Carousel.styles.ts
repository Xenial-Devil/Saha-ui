import { cva } from "class-variance-authority";
const carouselVariants = cva(
  "relative w-full overflow-hidden h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]",
  {
    variants: {
      variant: {
        default: "rounded-none",
        contained: "max-w-7xl mx-auto",
        bordered: "rounded-xl border-2 border-border shadow-lg",
        glass:
          "rounded-xl border border-border/30 bg-background/5 backdrop-blur-sm shadow-2xl",
      },
      effect: {
        slide: "",
        fade: "",
        cube: "perspective-1000",
        flip: "perspective-1000",
      },
    },
    defaultVariants: {
      variant: "default",
      effect: "slide",
    },
  }
);

const navigationVariants = cva(
  "absolute top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl border-2",
  {
    variants: {
      variant: {
        default:
          "bg-white/95 text-black hover:bg-white hover:scale-110 active:scale-95 border-white/50 hover:border-white shadow-black/30 dark:bg-white dark:text-black",
        contained:
          "bg-white/95 text-black hover:bg-white hover:scale-110 active:scale-95 border-white/50 hover:border-white shadow-black/30 dark:bg-white dark:text-black",
        bordered:
          "bg-primary text-white hover:bg-primary/90 hover:scale-110 active:scale-95 border-primary/50 hover:border-primary shadow-black/40",
        glass:
          "bg-white/40 text-white hover:bg-white/60 backdrop-blur-md hover:scale-110 active:scale-95 border-white/40 hover:border-white/60 shadow-black/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const indicatorVariants = cva(
  "w-2 h-2 rounded-full transition-all duration-300 cursor-pointer hover:scale-150 bg-white border-2 border-white/50",
  {
    variants: {
      active: {
        true: "w-8 scale-110 bg-white border-white shadow-lg shadow-white/70",
        false:
          "bg-white/60 border-white/40 hover:bg-white/80 hover:border-white/60",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);
export { carouselVariants, navigationVariants, indicatorVariants };