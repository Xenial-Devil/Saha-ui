import { cva } from "class-variance-authority";

/**
 * Skeleton variant styles using CVA
 *
 * Why we use skeleton loaders:
 * 1. Improve perceived performance - users see immediate feedback
 * 2. Reduce layout shift - maintain space before content loads
 * 3. Better UX - animated placeholders feel more responsive than blank screens
 * 4. Communicate loading state - users understand content is coming
 */
export const skeletonVariants = cva(
  [
    // Base styles
    "relative",
    "overflow-hidden",
    "bg-gradient-to-r",
    "from-muted/60",
    "via-muted/40",
    "to-muted/60",
    "dark:from-muted/20",
    "dark:via-muted/10",
    "dark:to-muted/20",
  ],
  {
    variants: {
      variant: {
        // Simple pulse animation - best for subtle loading states
        default: ["animate-pulse"],

        // Pulse with enhanced rhythm - draws more attention
        pulse: ["animate-[pulse_1.5s_cubic-bezier(0.4,0,0.6,1)_infinite]"],

        // Wave effect with sweeping gradient - premium feel
        wave: [
          "before:absolute",
          "before:inset-0",
          "before:-translate-x-full",
          "before:animate-[shimmer_2s_ease-in-out_infinite]",
          "before:bg-gradient-to-r",
          "before:from-transparent",
          "before:via-white/20",
          "dark:before:via-white/10",
          "before:to-transparent",
        ],

        // Fast shimmer - energetic loading state
        shimmer: [
          "before:absolute",
          "before:inset-0",
          "before:-translate-x-full",
          "before:animate-[shimmer_1.5s_ease-in-out_infinite]",
          "before:bg-gradient-to-r",
          "before:from-transparent",
          "before:via-primary/20",
          "dark:before:via-primary/15",
          "before:to-transparent",
          "before:blur-sm",
        ],

        // Gradient flow - smooth color transition
        gradient: [
          "bg-gradient-to-r",
          "from-muted/80",
          "via-primary/20",
          "to-muted/80",
          "dark:from-muted/30",
          "dark:via-primary/10",
          "dark:to-muted/30",
          "animate-[pulse_2s_ease-in-out_infinite]",
          "bg-[length:200%_100%]",
        ],

        // Glass morphism effect - modern and elegant
        glass: [
          "bg-white/5",
          "dark:bg-white/[0.02]",
          "backdrop-blur-sm",
          "border",
          "border-white/10",
          "dark:border-white/5",
          "before:absolute",
          "before:inset-0",
          "before:-translate-x-full",
          "before:animate-[shimmer_2.5s_ease-in-out_infinite]",
          "before:bg-gradient-to-r",
          "before:from-transparent",
          "before:via-white/15",
          "dark:before:via-white/8",
          "before:to-transparent",
        ],

        // Glow effect - attention-grabbing
        glow: [
          "animate-[pulse_2s_ease-in-out_infinite]",
          "shadow-lg",
          "shadow-primary/10",
          "dark:shadow-primary/5",
          "before:absolute",
          "before:inset-0",
          "before:-translate-x-full",
          "before:animate-[shimmer_2s_ease-in-out_infinite]",
          "before:bg-gradient-to-r",
          "before:from-transparent",
          "before:via-primary/30",
          "dark:before:via-primary/20",
          "before:to-transparent",
        ],
      },
      shape: {
        rectangle: ["rounded-md"],
        circle: ["rounded-full", "aspect-square"],
        rounded: ["rounded-lg"],
        text: ["rounded-sm", "h-4"],
        card: ["rounded-xl"],
        button: ["rounded-lg", "h-10"],
        input: ["rounded-md", "h-10"],
        avatar: ["rounded-full", "aspect-square"],
      },
      speed: {
        slow: ["[animation-duration:3s]"],
        normal: [],
        fast: ["[animation-duration:1s]"],
        "ultra-fast": ["[animation-duration:0.6s]"],
      },
    },
    defaultVariants: {
      variant: "default",
      shape: "rectangle",
      speed: "normal",
    },
  },
);

/**
 * Container variant for skeleton groups
 */
export const skeletonContainerVariants = cva(
  ["flex", "flex-col", "gap-3", "w-full"],
  {
    variants: {
      spacing: {
        tight: ["gap-1"],
        normal: ["gap-3"],
        loose: ["gap-4"],
        relaxed: ["gap-6"],
      },
    },
    defaultVariants: {
      spacing: "normal",
    },
  },
);
