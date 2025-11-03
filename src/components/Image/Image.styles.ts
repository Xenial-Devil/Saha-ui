import { cva } from "class-variance-authority";
/**
 * CVA variants for Image container
 */
const imageContainerVariants = cva(
  "relative overflow-hidden transition-all duration-300 isolate group hover:scale-105 active:scale-95 shadow-md hover:shadow-2xl",
  {
    variants: {
      variant: {
        default:
          "rounded-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-black/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 before:pointer-events-none",
        rounded:
          "rounded-lg before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-black/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 before:pointer-events-none before:rounded-lg",
        circular:
          "rounded-full before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-black/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 before:pointer-events-none before:rounded-full ring-2 ring-border ring-offset-2 ring-offset-background hover:ring-primary/50",
        bordered:
          "rounded-lg border-2 border-border hover:border-primary/50 shadow-lg hover:shadow-xl before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 before:pointer-events-none before:rounded-lg",
        glass:
          "rounded-lg border border-border/30 bg-background/5 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:border-white/20 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 before:pointer-events-none before:rounded-lg",
      },
      size: {
        xs: "w-16 h-16",
        sm: "w-24 h-24",
        md: "w-32 h-32",
        lg: "w-48 h-48",
        xl: "w-64 h-64",
        "2xl": "w-96 h-96",
        full: "w-full h-full",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * CVA variants for the actual image element
 */
const imageVariants = cva(
  "w-full h-full transition-all duration-500 brightness-100 hover:brightness-110",
  {
    variants: {
      fit: {
        cover: "object-cover",
        contain: "object-contain",
        fill: "object-fill",
        none: "object-none",
        "scale-down": "object-scale-down",
      },
      zoom: {
        true: "hover:scale-125 cursor-zoom-in hover:rotate-2",
        false: "hover:scale-105",
      },
    },
    defaultVariants: {
      fit: "cover",
      zoom: false,
    },
  }
);

/**
 * CVA variants for loading skeleton
 */
const skeletonVariants = cva(
  "absolute inset-0 animate-pulse bg-gradient-to-r from-muted via-primary/10 to-muted before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:animate-[shimmer_2s_ease-in-out_infinite]",
  {
    variants: {
      variant: {
        default: "rounded-none",
        rounded: "rounded-lg before:rounded-lg",
        circular: "rounded-full before:rounded-full",
        bordered: "rounded-lg before:rounded-lg",
        glass: "rounded-lg before:rounded-lg backdrop-blur-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
export { imageContainerVariants, imageVariants, skeletonVariants };