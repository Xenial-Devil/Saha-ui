import { cva } from "class-variance-authority";
// Define button variants using CVA
const buttonVariants = cva(
  // Base styles - applied to all buttons
  "group relative inline-flex items-center justify-center font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 disabled:saturate-50 overflow-hidden isolate hover:scale-[1.02] active:scale-[0.98] transform-gpu will-change-transform cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
        primary:
          "bg-primary text-primary-foreground shadow-[0_4px_14px_0] shadow-primary/40 hover:shadow-[0_8px_24px_0] hover:shadow-primary/60 hover:brightness-110 active:brightness-90 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/20 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[0_4px_14px_0] shadow-secondary/40 hover:shadow-[0_8px_24px_0] hover:shadow-secondary/60 hover:brightness-110 active:brightness-90 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/20 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300",
        accent:
          "bg-accent text-accent-foreground shadow-[0_4px_14px_0] shadow-accent/40 hover:shadow-[0_8px_24px_0] hover:shadow-accent/60 hover:brightness-110 active:brightness-90 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/20 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300",
        info: "bg-info text-info-foreground shadow-[0_4px_14px_0] shadow-info/40 hover:shadow-[0_8px_24px_0] hover:shadow-info/60 hover:brightness-110 active:brightness-90 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/20 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300",
        success:
          "bg-success text-success-foreground shadow-[0_4px_14px_0] shadow-success/40 hover:shadow-[0_8px_24px_0] hover:shadow-success/60 hover:brightness-110 active:brightness-90 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/20 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300",
        warning:
          "bg-warning text-warning-foreground shadow-[0_4px_14px_0] shadow-warning/40 hover:shadow-[0_8px_24px_0] hover:shadow-warning/60 hover:brightness-110 active:brightness-90 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/20 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300",
        error:
          "bg-destructive text-destructive-foreground shadow-[0_4px_14px_0] shadow-destructive/40 hover:shadow-[0_8px_24px_0] hover:shadow-destructive/60 hover:brightness-110 active:brightness-90 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/20 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300",
        outline:
          "border-2 border-primary/60 text-primary bg-transparent hover:text-primary-foreground shadow-sm hover:shadow-[0_6px_18px_0] hover:shadow-primary/30 before:absolute before:inset-0 before:bg-primary before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300 before:ease-out before:origin-left active:before:scale-x-100",
        ghost:
          "bg-transparent hover:bg-accent/15 active:bg-accent/25 text-foreground shadow-sm hover:shadow-lg hover:shadow-accent/10 transition-all",
        glass:
          "bg-white/10 dark:bg-black/10 backdrop-blur-xl border-2 border-white/20 shadow-[0_8px_32px_0] shadow-black/10 hover:shadow-[0_16px_56px_0] hover:shadow-primary/20 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_50%)] after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-700",
      },
      size: {
        xs: "h-7 px-3 text-xs gap-1.5 min-w-[3rem] rounded-lg",
        sm: "h-9 px-4 text-sm gap-2 min-w-[4rem] rounded-xl",
        md: "h-11 px-6 text-base gap-2.5 min-w-[5rem] rounded-xl",
        lg: "h-13 px-8 text-lg gap-3 min-w-[6rem] rounded-2xl",
        xl: "h-16 px-10 text-xl gap-3.5 min-w-[7rem] rounded-2xl",
        "2xl": "h-20 px-12 text-2xl gap-4 min-w-[8rem] rounded-3xl",
        "3xl": "h-24 px-14 text-3xl gap-5 min-w-[9rem] rounded-3xl",
        "4xl": "h-28 px-16 text-4xl gap-6 min-w-[10rem] rounded-3xl",
        icon: "h-10 w-10 p-0 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// Shimmer effect classes
const shimmerVariants = cva("", {
  variants: {
    variant: {
      default: "",
      primary:
        "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/25 after:to-transparent after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-1000 after:ease-in-out",
      secondary:
        "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/25 after:to-transparent after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-1000 after:ease-in-out",
      accent:
        "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/25 after:to-transparent after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-1000 after:ease-in-out",
      info: "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/25 after:to-transparent after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-1000 after:ease-in-out",
      success:
        "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/25 after:to-transparent after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-1000 after:ease-in-out",
      warning:
        "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/25 after:to-transparent after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-1000 after:ease-in-out",
      error:
        "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/25 after:to-transparent after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-1000 after:ease-in-out",
      outline: "",
      ghost: "",
      glass: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export { buttonVariants, shimmerVariants };
