import { cva } from "class-variance-authority";
/**
 * Badge variants using CVA for type-safe styling
 */
const badgeVariants = cva(
  // Base styles
  "relative inline-flex items-center justify-center gap-1.5 font-medium transition-all duration-200 select-none overflow-hidden isolate transform-gpu will-change-transform",
  {
    variants: {
      variant: {
        default:
          "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 shadow-sm hover:shadow-md hover:scale-105 active:scale-95",
        primary:
          "bg-gradient-to-r from-primary/90 to-primary text-primary-foreground shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/40 hover:scale-105 active:scale-95 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        secondary:
          "bg-gradient-to-r from-secondary/90 to-secondary text-secondary-foreground shadow-md shadow-secondary/25 hover:shadow-lg hover:shadow-secondary/40 hover:scale-105 active:scale-95 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        accent:
          "bg-gradient-to-r from-accent/90 to-accent text-accent-foreground shadow-md shadow-accent/25 hover:shadow-lg hover:shadow-accent/40 hover:scale-105 active:scale-95 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        success:
          "bg-gradient-to-r from-green-500/90 to-green-600 text-white shadow-md shadow-green-500/25 hover:shadow-lg hover:shadow-green-500/40 hover:scale-105 active:scale-95 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        warning:
          "bg-gradient-to-r from-yellow-500/90 to-yellow-600 text-white shadow-md shadow-yellow-500/25 hover:shadow-lg hover:shadow-yellow-500/40 hover:scale-105 active:scale-95 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        error:
          "bg-gradient-to-r from-red-500/90 to-red-600 text-white shadow-md shadow-red-500/25 hover:shadow-lg hover:shadow-red-500/40 hover:scale-105 active:scale-95 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        info: "bg-gradient-to-r from-blue-500/90 to-blue-600 text-white shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/40 hover:scale-105 active:scale-95 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        outline:
          "border-2 border-current text-foreground bg-transparent hover:bg-foreground/5 dark:hover:bg-foreground/10 hover:scale-105 active:scale-95 hover:shadow-md",
        ghost:
          "bg-transparent text-foreground hover:bg-foreground/5 dark:hover:bg-foreground/10 hover:scale-105 active:scale-95",
        glass:
          "bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/10 hover:bg-white/15 dark:hover:bg-black/15 hover:scale-105 active:scale-95 hover:shadow-2xl hover:shadow-primary/20 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_50%)] after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500",
      },
      size: {
        sm: "text-xs px-2 py-0.5 min-h-[20px] rounded-md",
        md: "text-sm px-2.5 py-1 min-h-[24px] rounded-lg",
        lg: "text-base px-3 py-1.5 min-h-[28px] rounded-lg",
      },
      shape: {
        rounded: "",
        pill: "!rounded-full",
        square: "!rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      shape: "rounded",
    },
  },
);
export { badgeVariants };
