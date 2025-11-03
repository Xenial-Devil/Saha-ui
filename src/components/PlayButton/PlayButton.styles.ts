import { cva } from "class-variance-authority";

/**
 * PlayButton variants using CVA
 */
export const playButtonVariants = cva(
  [
    "group relative inline-flex items-center justify-center",
    "rounded-full transition-all duration-300 ease-out",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-40",
    "overflow-hidden isolate cursor-pointer",
    "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
    "after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/10 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-card text-foreground",
          "border-2 border-border",
          "shadow-lg hover:shadow-2xl",
          "hover:scale-110 hover:rotate-[5deg] active:scale-95 active:rotate-0",
        ],
        primary: [
          "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground",
          "border-2 border-primary/80",
          "shadow-lg shadow-primary/40 hover:shadow-2xl hover:shadow-primary/70",
          "hover:brightness-110 active:brightness-90",
          "hover:scale-110 hover:rotate-[5deg] active:scale-95 active:rotate-0",
        ],
        secondary: [
          "bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground",
          "border-2 border-secondary/80",
          "shadow-lg shadow-secondary/40 hover:shadow-2xl hover:shadow-secondary/70",
          "hover:brightness-110 active:brightness-90",
          "hover:scale-110 hover:rotate-[5deg] active:scale-95 active:rotate-0",
        ],
        accent: [
          "bg-gradient-to-br from-accent to-accent/80 text-accent-foreground",
          "border-2 border-accent/80",
          "shadow-lg shadow-accent/40 hover:shadow-2xl hover:shadow-accent/70",
          "hover:brightness-110 active:brightness-90",
          "hover:scale-110 hover:rotate-[5deg] active:scale-95 active:rotate-0",
        ],
        info: [
          "bg-gradient-to-br from-info to-info/80 text-info-foreground",
          "border-2 border-info/80",
          "shadow-lg shadow-info/40 hover:shadow-2xl hover:shadow-info/70",
          "hover:brightness-110 active:brightness-90",
          "hover:scale-110 hover:rotate-[5deg] active:scale-95 active:rotate-0",
        ],
        success: [
          "bg-gradient-to-br from-success to-success/80 text-success-foreground",
          "border-2 border-success/80",
          "shadow-lg shadow-success/40 hover:shadow-2xl hover:shadow-success/70",
          "hover:brightness-110 active:brightness-90",
          "hover:scale-110 hover:rotate-[5deg] active:scale-95 active:rotate-0",
        ],
        warning: [
          "bg-warning text-warning-foreground",
          "border-2 border-warning/80",
          "shadow-lg shadow-warning/40 hover:shadow-xl hover:shadow-warning/60",
          "hover:brightness-110 active:brightness-90",
          "hover:scale-105 active:scale-95",
        ],
        error: [
          "bg-destructive text-destructive-foreground",
          "border-2 border-destructive/80",
          "shadow-lg shadow-destructive/40 hover:shadow-xl hover:shadow-destructive/60",
          "hover:brightness-110 active:brightness-90",
          "hover:scale-105 active:scale-95",
        ],
        glass: [
          "backdrop-blur-xl bg-white/80 dark:bg-gray-900/80",
          "border-2 border-white/40 dark:border-white/20",
          "shadow-xl hover:shadow-2xl",
          "hover:bg-white/90 dark:hover:bg-gray-900/90",
          "hover:scale-105 active:scale-95",
        ],
      },
      size: {
        sm: "w-12 h-12",
        md: "w-16 h-16",
        lg: "w-20 h-20",
        xl: "w-24 h-24",
      },
      pulse: {
        true: "animate-pulse",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      pulse: false,
    },
  }
);