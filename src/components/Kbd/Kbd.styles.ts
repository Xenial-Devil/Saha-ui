import { cva } from "class-variance-authority";

/**
 * Kbd component styles with CVA
 * Beautiful keyboard key display without 3D effects
 */
export const kbdVariants = cva(
  // Base styles - monospace font, inline display, centered content
  [
    "inline-flex items-center justify-center",
    "font-mono font-medium",
    "rounded-md",
    "border",
    "transition-all duration-200",
    "select-none",
    "whitespace-nowrap",
    "shadow-sm",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-gradient-to-br from-gray-50 to-gray-100",
          "dark:from-gray-800 dark:to-gray-900",
          "border-gray-300 dark:border-gray-600",
          "text-gray-900 dark:text-gray-100",
          "hover:from-gray-100 hover:to-gray-200",
          "dark:hover:from-gray-700 dark:hover:to-gray-800",
          "shadow-gray-200/50 dark:shadow-gray-900/50",
        ],
        bordered: [
          "bg-transparent",
          "border-2 border-gray-400 dark:border-gray-500",
          "text-gray-900 dark:text-gray-100",
          "hover:border-gray-500 dark:hover:border-gray-400",
          "hover:bg-gray-50 dark:hover:bg-gray-800/50",
        ],
        solid: [
          "bg-gradient-to-br from-gray-700 to-gray-800",
          "dark:from-gray-600 dark:to-gray-700",
          "border-gray-800 dark:border-gray-600",
          "text-white",
          "hover:from-gray-600 hover:to-gray-700",
          "dark:hover:from-gray-500 dark:hover:to-gray-600",
          "shadow-lg shadow-gray-800/20",
        ],
        flat: [
          "bg-gray-100 dark:bg-gray-800",
          "border-transparent",
          "text-gray-900 dark:text-gray-100",
          "hover:bg-gray-200 dark:hover:bg-gray-700",
        ],
        ghost: [
          "bg-transparent",
          "border-transparent",
          "text-gray-700 dark:text-gray-300",
          "hover:bg-gray-100 dark:hover:bg-gray-800",
        ],
        primary: [
          "bg-gradient-to-br from-blue-500 to-blue-600",
          "dark:from-blue-600 dark:to-blue-700",
          "border-blue-600 dark:border-blue-600",
          "text-white",
          "hover:from-blue-600 hover:to-blue-700",
          "dark:hover:from-blue-500 dark:hover:to-blue-600",
          "shadow-lg shadow-blue-500/20",
        ],
        secondary: [
          "bg-gradient-to-br from-purple-500 to-purple-600",
          "dark:from-purple-600 dark:to-purple-700",
          "border-purple-600 dark:border-purple-600",
          "text-white",
          "hover:from-purple-600 hover:to-purple-700",
          "dark:hover:from-purple-500 dark:hover:to-purple-600",
          "shadow-lg shadow-purple-500/20",
        ],
        accent: [
          "bg-gradient-to-br from-pink-500 to-pink-600",
          "dark:from-pink-600 dark:to-pink-700",
          "border-pink-600 dark:border-pink-600",
          "text-white",
          "hover:from-pink-600 hover:to-pink-700",
          "dark:hover:from-pink-500 dark:hover:to-pink-600",
          "shadow-lg shadow-pink-500/20",
        ],
        success: [
          "bg-gradient-to-br from-green-500 to-green-600",
          "dark:from-green-600 dark:to-green-700",
          "border-green-600 dark:border-green-600",
          "text-white",
          "hover:from-green-600 hover:to-green-700",
          "dark:hover:from-green-500 dark:hover:to-green-600",
          "shadow-lg shadow-green-500/20",
        ],
        warning: [
          "bg-gradient-to-br from-yellow-500 to-yellow-600",
          "dark:from-yellow-600 dark:to-yellow-700",
          "border-yellow-600 dark:border-yellow-600",
          "text-white",
          "hover:from-yellow-600 hover:to-yellow-700",
          "dark:hover:from-yellow-500 dark:hover:to-yellow-600",
          "shadow-lg shadow-yellow-500/20",
        ],
        error: [
          "bg-gradient-to-br from-red-500 to-red-600",
          "dark:from-red-600 dark:to-red-700",
          "border-red-600 dark:border-red-600",
          "text-white",
          "hover:from-red-600 hover:to-red-700",
          "dark:hover:from-red-500 dark:hover:to-red-600",
          "shadow-lg shadow-red-500/20",
        ],
        info: [
          "bg-gradient-to-br from-cyan-500 to-cyan-600",
          "dark:from-cyan-600 dark:to-cyan-700",
          "border-cyan-600 dark:border-cyan-600",
          "text-white",
          "hover:from-cyan-600 hover:to-cyan-700",
          "dark:hover:from-cyan-500 dark:hover:to-cyan-600",
          "shadow-lg shadow-cyan-500/20",
        ],
        glass: [
          "border-white/20",
          "bg-white/10 backdrop-blur-xl",
          "shadow-2xl shadow-black/10",
          "dark:bg-black/10",
          "text-gray-900 dark:text-white",
          "hover:bg-white/20 dark:hover:bg-white/15",
        ],
      },
      size: {
        sm: ["text-xs", "px-1.5", "py-0.5", "min-w-[1.5rem]", "h-6"],
        md: ["text-sm", "px-2", "py-1", "min-w-[2rem]", "h-7"],
        lg: ["text-base", "px-2.5", "py-1.5", "min-w-[2.5rem]", "h-9"],
      },
      pressed: {
        true: ["scale-95", "shadow-inner", "brightness-90"],
        false: [],
      },
      disabled: {
        true: ["opacity-50", "cursor-not-allowed", "pointer-events-none"],
        false: ["cursor-default"],
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      pressed: false,
      disabled: false,
    },
  }
);

/**
 * KbdGroup component styles
 * Handles layout and spacing between keys
 */
export const kbdGroupVariants = cva(
  ["inline-flex items-center gap-1", "transition-all duration-200"],
  {
    variants: {
      wrap: {
        true: "flex-wrap",
        false: "flex-nowrap",
      },
    },
    defaultVariants: {
      wrap: false,
    },
  }
);

/**
 * KbdSeparator component styles
 * Visual separator between keys
 */
export const kbdSeparatorVariants = cva(
  [
    "inline-flex items-center justify-center",
    "text-gray-400 dark:text-gray-500",
    "select-none",
    "font-normal",
  ],
  {
    variants: {
      size: {
        sm: "text-xs px-1",
        md: "text-sm px-1.5",
        lg: "text-base px-2",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/**
 * KbdKey component styles (for keys inside Kbd)
 */
export const kbdKeyVariants = cva([
  "inline-flex items-center justify-center",
  "font-mono font-semibold",
]);

/**
 * KbdDescription component styles (for descriptions inside Kbd)
 */
export const kbdDescriptionVariants = cva([
  "inline-flex items-center",
  "text-xs",
  "opacity-70",
  "ml-1.5",
  "font-normal",
]);
