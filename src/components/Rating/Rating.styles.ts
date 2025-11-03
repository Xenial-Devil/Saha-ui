import { cva } from "class-variance-authority";
/**
 * Rating variants using CVA for type-safe styling
 */
const ratingVariants = cva(
  // Base styles
  "inline-flex items-center gap-1",
  {
    variants: {
      variant: {
        default: "",
        primary: "",
        secondary: "",
        gradient: "",
        glass: "",
        outline: "",
      },
      size: {
        sm: "text-sm gap-0.5",
        md: "text-base gap-1",
        lg: "text-xl gap-1.5",
        xl: "text-2xl gap-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

/**
 * Icon variants for different rating states
 */
const iconVariants = cva(
  "transition-all duration-300 cursor-pointer select-none relative drop-shadow-sm",
  {
    variants: {
      variant: {
        default:
          "text-yellow-500 dark:text-yellow-400 hover:drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]",
        primary:
          "text-primary hover:drop-shadow-[0_0_8px_rgba(var(--primary),0.6)]",
        secondary:
          "text-secondary hover:drop-shadow-[0_0_8px_rgba(var(--secondary),0.6)]",
        gradient:
          "text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 hover:drop-shadow-[0_0_12px_rgba(249,115,22,0.6)]",
        glass:
          "text-white/80 dark:text-white/60 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]",
        outline: "text-foreground hover:drop-shadow-[0_0_6px_rgba(0,0,0,0.3)]",
      },
      size: {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
        xl: "w-8 h-8",
      },
      state: {
        empty: "opacity-30",
        filled: "opacity-100 filter brightness-110",
        half: "opacity-70",
      },
      interactive: {
        true: "hover:scale-125 hover:rotate-[10deg] active:scale-95 active:rotate-0",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      state: "empty",
      interactive: false,
    },
  }
);
export { ratingVariants, iconVariants };