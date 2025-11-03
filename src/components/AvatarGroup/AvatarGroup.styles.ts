import { cva } from "class-variance-authority";
/**
 * CVA variants for AvatarGroup container
 */
const avatarGroupVariants = cva("flex items-center", {
  variants: {
    variant: {
      stack: "flex-row",
      row: "flex-row gap-2",
      grid: "grid grid-cols-3 gap-2",
      "grid-dense": "grid grid-cols-4 gap-1",
    },
  },
  defaultVariants: {
    variant: "stack",
  },
});

/**
 * CVA variants for individual avatar wrapper in stack mode
 */
const avatarWrapperVariants = cva(
  "relative transition-all duration-200 hover:scale-110 hover:z-50",
  {
    variants: {
      size: {
        xs: "ring-0",
        sm: "ring-0",
        md: "ring-0",
        lg: "ring-0",
        xl: "ring-0",
        "2xl": "ring-0",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/**
 * CVA variants for the "+X more" indicator
 */
const moreIndicatorVariants = cva(
  "flex items-center justify-center font-semibold transition-all duration-200 hover:scale-110 cursor-pointer",
  {
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
        xl: "text-lg",
        "2xl": "text-xl",
      },
      variant: {
        stack:
          "rounded-full ring-2 ring-background bg-gradient-to-br from-primary/20 to-accent/20 text-foreground backdrop-blur-sm",
        row: "rounded-full ring-2 ring-background bg-gradient-to-br from-primary/20 to-accent/20 text-foreground backdrop-blur-sm",
        grid: "rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 text-foreground/80",
        "grid-dense":
          "rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 text-foreground/80",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "stack",
    },
  }
);
export {
  avatarGroupVariants,
  avatarWrapperVariants,
  moreIndicatorVariants,
};