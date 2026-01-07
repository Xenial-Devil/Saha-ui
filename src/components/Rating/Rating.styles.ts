import { cva } from "class-variance-authority";

/**
 * Rating container variants
 */
const ratingVariants = cva("inline-flex items-center", {
  variants: {
    variant: {
      default: "",
      primary: "",
      secondary: "",
      gradient: "",
      glass: "bg-white/10 backdrop-blur-sm rounded-lg p-2",
      outline: "",
      neon: "",
      soft: "bg-muted/50 rounded-lg p-2",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-xl",
      xl: "text-2xl",
      "2xl": "text-3xl",
      "3xl": "text-4xl",
      "4xl": "text-5xl",
    },
    direction: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
    gap: {
      none: "gap-0",
      xs: "gap-0.5",
      sm: "gap-1",
      md: "gap-1.5",
      lg: "gap-2",
      xl: "gap-3",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    direction: "horizontal",
    gap: "sm",
  },
});

/**
 * Icon variants for different rating states
 */
const iconVariants = cva("transition-all duration-300 select-none relative", {
  variants: {
    variant: {
      default: "drop-shadow-sm",
      primary: "drop-shadow-sm",
      secondary: "drop-shadow-sm",
      gradient: "drop-shadow-md",
      glass: "drop-shadow-lg",
      outline: "",
      neon: "",
      soft: "",
    },
    size: {
      xs: "w-3 h-3",
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
      xl: "w-8 h-8",
      "2xl": "w-10 h-10",
      "3xl": "w-12 h-12",
      "4xl": "w-16 h-16",
    },
    state: {
      empty: "",
      filled: "",
      half: "",
    },
    interactive: {
      true: "cursor-pointer hover:scale-110 active:scale-95",
      false: "",
    },
  },
  compoundVariants: [
    {
      variant: "neon",
      state: "filled",
      className: "filter brightness-110",
    },
    {
      variant: "gradient",
      state: "filled",
      className: "filter brightness-110",
    },
  ],
  defaultVariants: {
    variant: "default",
    size: "md",
    state: "empty",
    interactive: false,
  },
});

/**
 * Size to pixel mapping for custom icons
 */
export const sizeMap: Record<string, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  "2xl": 40,
  "3xl": 48,
  "4xl": 64,
};

export { ratingVariants, iconVariants };
