import { cva } from "class-variance-authority";

/**
 * Label component styles with CVA
 * Beautiful label display without 3D effects
 */
export const labelVariants = cva(
  // Base styles
  [
    "inline-flex items-center gap-1.5",
    "font-medium",
    "transition-all duration-200",
    "select-none",
    "cursor-pointer",
  ],
  {
    variants: {
      variant: {
        default: [
          "text-gray-900 dark:text-gray-100",
          "hover:text-gray-700 dark:hover:text-gray-300",
        ],
        primary: [
          "text-blue-600 dark:text-blue-400",
          "hover:text-blue-700 dark:hover:text-blue-300",
        ],
        secondary: [
          "text-purple-600 dark:text-purple-400",
          "hover:text-purple-700 dark:hover:text-purple-300",
        ],
        accent: [
          "text-pink-600 dark:text-pink-400",
          "hover:text-pink-700 dark:hover:text-pink-300",
        ],
        success: [
          "text-green-600 dark:text-green-400",
          "hover:text-green-700 dark:hover:text-green-300",
        ],
        warning: [
          "text-yellow-600 dark:text-yellow-400",
          "hover:text-yellow-700 dark:hover:text-yellow-300",
        ],
        error: [
          "text-red-600 dark:text-red-400",
          "hover:text-red-700 dark:hover:text-red-300",
        ],
        info: [
          "text-cyan-600 dark:text-cyan-400",
          "hover:text-cyan-700 dark:hover:text-cyan-300",
        ],
        muted: [
          "text-gray-500 dark:text-gray-400",
          "hover:text-gray-600 dark:hover:text-gray-300",
        ],
        outline: [
          "text-gray-700 dark:text-gray-300",
          "border border-gray-300 dark:border-gray-600",
          "px-2 py-0.5 rounded",
          "hover:border-gray-400 dark:hover:border-gray-500",
          "hover:bg-gray-50 dark:hover:bg-gray-800/50",
        ],
        glass: [
          "border border-white/20",
          "bg-white/10 backdrop-blur-xl",
          "shadow-2xl shadow-black/10",
          "dark:bg-black/10",
          "text-gray-900 dark:text-white",
          "px-2 py-0.5 rounded",
          "hover:bg-white/20 dark:hover:bg-white/15",
        ],
      },
      size: {
        sm: ["text-xs"],
        md: ["text-sm"],
        lg: ["text-base"],
      },
      position: {
        top: ["flex-col items-start"],
        left: ["flex-row items-center"],
        right: ["flex-row-reverse items-center"],
        floating: [
          "absolute",
          "left-3",
          "top-2.5",
          "transition-all duration-200",
          "pointer-events-none",
          "px-1",
          "bg-white dark:bg-gray-900",
        ],
      },
      disabled: {
        true: ["opacity-50", "cursor-not-allowed", "pointer-events-none"],
        false: [],
      },
      error: {
        true: ["text-red-600 dark:text-red-400"],
        false: [],
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      position: "top",
      disabled: false,
      error: false,
    },
  }
);

/**
 * LabelGroup component styles
 */
export const labelGroupVariants = cva(["flex"], {
  variants: {
    direction: {
      horizontal: "flex-row flex-wrap",
      vertical: "flex-col",
    },
    spacing: {
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
    },
  },
  defaultVariants: {
    direction: "vertical",
    spacing: "md",
  },
});

/**
 * LabelDescription component styles
 */
export const labelDescriptionVariants = cva([
  "inline-flex items-center",
  "text-xs",
  "text-gray-500 dark:text-gray-400",
  "font-normal",
  "mt-0.5",
]);

/**
 * LabelError component styles
 */
export const labelErrorVariants = cva([
  "inline-flex items-center gap-1",
  "text-xs",
  "text-red-600 dark:text-red-400",
  "font-normal",
  "mt-0.5",
]);

/**
 * LabelRequired component styles
 */
export const labelRequiredVariants = cva([
  "inline-flex items-center",
  "text-red-500 dark:text-red-400",
  "ml-0.5",
]);

/**
 * LabelOptional component styles
 */
export const labelOptionalVariants = cva([
  "inline-flex items-center",
  "text-gray-400 dark:text-gray-500",
  "text-xs",
  "font-normal",
  "ml-1",
]);

/**
 * LabelHelp component styles
 */
export const labelHelpVariants = cva([
  "inline-flex items-center justify-center",
  "w-4 h-4",
  "rounded-full",
  "bg-gray-200 dark:bg-gray-700",
  "text-gray-600 dark:text-gray-300",
  "text-xs",
  "ml-1",
  "cursor-help",
  "transition-colors duration-200",
  "hover:bg-gray-300 dark:hover:bg-gray-600",
]);
