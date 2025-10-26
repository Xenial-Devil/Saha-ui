import { cva } from "class-variance-authority";

/**
 * Native Select component styles
 */
export const nativeSelectVariants = cva(
  [
    "w-full",
    "rounded-md",
    "border-2",
    "px-3",
    "font-medium",
    "transition-all duration-200",
    "outline-none",
    "cursor-pointer",
    "appearance-none",
    "bg-no-repeat",
    "bg-right",
    "pr-10",
    "focus:ring-2 focus:ring-offset-1",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-white dark:bg-gray-900",
          "border-gray-300 dark:border-gray-600",
          "text-gray-900 dark:text-gray-100",
          "hover:border-gray-400 dark:hover:border-gray-500",
          "focus:border-gray-500 dark:focus:border-gray-400",
          "focus:ring-gray-200 dark:focus:ring-gray-700",
        ],
        bordered: [
          "bg-transparent",
          "border-gray-400 dark:border-gray-500",
          "text-gray-900 dark:text-gray-100",
          "hover:border-gray-500 dark:hover:border-gray-400",
          "focus:border-gray-600 dark:focus:border-gray-300",
          "focus:ring-gray-200 dark:focus:ring-gray-700",
        ],
        filled: [
          "bg-gray-100 dark:bg-gray-800",
          "border-transparent",
          "text-gray-900 dark:text-gray-100",
          "hover:bg-gray-200 dark:hover:bg-gray-700",
          "focus:bg-white dark:focus:bg-gray-900",
          "focus:border-gray-400 dark:focus:border-gray-500",
          "focus:ring-gray-200 dark:focus:ring-gray-700",
        ],
        ghost: [
          "bg-transparent",
          "border-transparent",
          "text-gray-900 dark:text-gray-100",
          "hover:bg-gray-100 dark:hover:bg-gray-800",
          "focus:bg-white dark:focus:bg-gray-900",
          "focus:border-gray-300 dark:focus:border-gray-600",
          "focus:ring-gray-200 dark:focus:ring-gray-700",
        ],
        // Color variants
        primary: [
          "bg-white dark:bg-gray-900",
          "border-blue-300 dark:border-blue-700",
          "text-blue-900 dark:text-blue-100",
          "hover:border-blue-400 dark:hover:border-blue-600",
          "focus:border-blue-500 dark:focus:border-blue-500",
          "focus:ring-blue-200 dark:focus:ring-blue-900",
        ],
        secondary: [
          "bg-white dark:bg-gray-900",
          "border-purple-300 dark:border-purple-700",
          "text-purple-900 dark:text-purple-100",
          "hover:border-purple-400 dark:hover:border-purple-600",
          "focus:border-purple-500 dark:focus:border-purple-500",
          "focus:ring-purple-200 dark:focus:ring-purple-900",
        ],
        success: [
          "bg-white dark:bg-gray-900",
          "border-green-300 dark:border-green-700",
          "text-green-900 dark:text-green-100",
          "hover:border-green-400 dark:hover:border-green-600",
          "focus:border-green-500 dark:focus:border-green-500",
          "focus:ring-green-200 dark:focus:ring-green-900",
        ],
        warning: [
          "bg-white dark:bg-gray-900",
          "border-yellow-300 dark:border-yellow-700",
          "text-yellow-900 dark:text-yellow-100",
          "hover:border-yellow-400 dark:hover:border-yellow-600",
          "focus:border-yellow-500 dark:focus:border-yellow-500",
          "focus:ring-yellow-200 dark:focus:ring-yellow-900",
        ],
        danger: [
          "bg-white dark:bg-gray-900",
          "border-red-300 dark:border-red-700",
          "text-red-900 dark:text-red-100",
          "hover:border-red-400 dark:hover:border-red-600",
          "focus:border-red-500 dark:focus:border-red-500",
          "focus:ring-red-200 dark:focus:ring-red-900",
        ],
        info: [
          "bg-white dark:bg-gray-900",
          "border-sky-300 dark:border-sky-700",
          "text-sky-900 dark:text-sky-100",
          "hover:border-sky-400 dark:hover:border-sky-600",
          "focus:border-sky-500 dark:focus:border-sky-500",
          "focus:ring-sky-200 dark:focus:ring-sky-900",
        ],
        purple: [
          "bg-white dark:bg-gray-900",
          "border-purple-300 dark:border-purple-700",
          "text-purple-900 dark:text-purple-100",
          "hover:border-purple-400 dark:hover:border-purple-600",
          "focus:border-purple-500 dark:focus:border-purple-500",
          "focus:ring-purple-200 dark:focus:ring-purple-900",
        ],
        pink: [
          "bg-white dark:bg-gray-900",
          "border-pink-300 dark:border-pink-700",
          "text-pink-900 dark:text-pink-100",
          "hover:border-pink-400 dark:hover:border-pink-600",
          "focus:border-pink-500 dark:focus:border-pink-500",
          "focus:ring-pink-200 dark:focus:ring-pink-900",
        ],
        indigo: [
          "bg-white dark:bg-gray-900",
          "border-indigo-300 dark:border-indigo-700",
          "text-indigo-900 dark:text-indigo-100",
          "hover:border-indigo-400 dark:hover:border-indigo-600",
          "focus:border-indigo-500 dark:focus:border-indigo-500",
          "focus:ring-indigo-200 dark:focus:ring-indigo-900",
        ],
        cyan: [
          "bg-white dark:bg-gray-900",
          "border-cyan-300 dark:border-cyan-700",
          "text-cyan-900 dark:text-cyan-100",
          "hover:border-cyan-400 dark:hover:border-cyan-600",
          "focus:border-cyan-500 dark:focus:border-cyan-500",
          "focus:ring-cyan-200 dark:focus:ring-cyan-900",
        ],
        teal: [
          "bg-white dark:bg-gray-900",
          "border-teal-300 dark:border-teal-700",
          "text-teal-900 dark:text-teal-100",
          "hover:border-teal-400 dark:hover:border-teal-600",
          "focus:border-teal-500 dark:focus:border-teal-500",
          "focus:ring-teal-200 dark:focus:ring-teal-900",
        ],
        orange: [
          "bg-white dark:bg-gray-900",
          "border-orange-300 dark:border-orange-700",
          "text-orange-900 dark:text-orange-100",
          "hover:border-orange-400 dark:hover:border-orange-600",
          "focus:border-orange-500 dark:focus:border-orange-500",
          "focus:ring-orange-200 dark:focus:ring-orange-900",
        ],
        glass: [
          "border-white/20",
          "bg-white/10 backdrop-blur-xl",
          "dark:bg-black/10",
          "text-gray-900 dark:text-white",
          "hover:border-white/30",
          "focus:border-white/40",
          "focus:ring-white/20",
        ],
      },
      size: {
        sm: "py-1.5 text-sm",
        md: "py-2.5 text-base",
        lg: "py-3.5 text-lg",
      },
      error: {
        true: [
          "border-red-500 dark:border-red-500",
          "focus:border-red-600 dark:focus:border-red-400",
          "focus:ring-red-200 dark:focus:ring-red-900",
        ],
        false: "",
      },
      success: {
        true: [
          "border-green-500 dark:border-green-500",
          "focus:border-green-600 dark:focus:border-green-400",
          "focus:ring-green-200 dark:focus:ring-green-900",
        ],
        false: "",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      error: false,
      success: false,
      disabled: false,
    },
  }
);

/**
 * Native Select option styles (applied to individual options)
 */
export const nativeSelectOptionVariants = cva([
  "py-2 px-3",
  "font-medium",
  "transition-colors",
]);

/**
 * Native Select group (optgroup) styles
 */
export const nativeSelectGroupVariants = cva([
  "font-bold",
  "text-sm",
  "uppercase",
  "tracking-wide",
  "py-1",
]);

/**
 * Native Select wrapper styles
 */
export const nativeSelectWrapperVariants = cva(["relative w-full space-y-1.5"]);

/**
 * Native Select label styles
 */
export const nativeSelectLabelVariants = cva([
  "block",
  "text-sm",
  "font-medium",
  "text-gray-700 dark:text-gray-300",
  "mb-1.5",
]);

/**
 * Native Select description styles
 */
export const nativeSelectDescriptionVariants = cva([
  "text-xs",
  "text-gray-500 dark:text-gray-400",
]);

/**
 * Native Select error styles
 */
export const nativeSelectErrorVariants = cva([
  "text-xs",
  "text-red-600 dark:text-red-400",
  "font-medium",
]);

/**
 * Native Select icon wrapper styles (for chevron)
 */
export const nativeSelectIconVariants = cva([
  "absolute",
  "right-3",
  "top-1/2",
  "-translate-y-1/2",
  "pointer-events-none",
  "text-gray-400 dark:text-gray-500",
]);
