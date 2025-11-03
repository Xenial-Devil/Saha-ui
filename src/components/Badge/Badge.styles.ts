import { cva } from "class-variance-authority";
/**
 * Badge variants using CVA for type-safe styling
 */
const badgeVariants = cva(
  // Base styles
  "relative inline-flex items-center justify-center gap-1.5 font-medium transition-all duration-200 select-none overflow-hidden isolate",
  {
    variants: {
      variant: {
        default:
          "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 shadow-sm hover:shadow-md",
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
          "backdrop-blur-md bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 shadow-lg hover:bg-white/20 dark:hover:bg-black/20 hover:scale-105 active:scale-95 hover:shadow-xl before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
      },
      size: {
        sm: "text-xs px-2 py-0.5 min-h-[20px]",
        md: "text-sm px-2.5 py-1 min-h-[24px]",
        lg: "text-base px-3 py-1.5 min-h-[28px]",
      },
      shape: {
        rounded: "rounded-md",
        pill: "rounded-full",
        square: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      shape: "rounded",
    },
  }
);
export { badgeVariants };