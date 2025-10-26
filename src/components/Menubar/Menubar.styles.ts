import { cva } from "class-variance-authority";

/**
 * Menubar component styles (root container)
 */
export const menubarVariants = cva(
  [
    "inline-flex items-center",
    "rounded-md",
    "border",
    "p-1",
    "gap-1",
    "shadow-sm",
    "transition-all duration-200",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-white dark:bg-gray-900",
          "border-gray-200 dark:border-gray-700",
        ],
        bordered: [
          "bg-transparent",
          "border-2 border-gray-300 dark:border-gray-600",
        ],
        filled: ["bg-gray-100 dark:bg-gray-800", "border-transparent"],
        ghost: ["bg-transparent", "border-transparent"],
        // Color variants
        primary: [
          "bg-white dark:bg-gray-900",
          "border-blue-200 dark:border-blue-800",
        ],
        secondary: [
          "bg-white dark:bg-gray-900",
          "border-purple-200 dark:border-purple-800",
        ],
        success: [
          "bg-white dark:bg-gray-900",
          "border-green-200 dark:border-green-800",
        ],
        warning: [
          "bg-white dark:bg-gray-900",
          "border-yellow-200 dark:border-yellow-800",
        ],
        danger: [
          "bg-white dark:bg-gray-900",
          "border-red-200 dark:border-red-800",
        ],
        info: [
          "bg-white dark:bg-gray-900",
          "border-sky-200 dark:border-sky-800",
        ],
        purple: [
          "bg-white dark:bg-gray-900",
          "border-purple-200 dark:border-purple-800",
        ],
        pink: [
          "bg-white dark:bg-gray-900",
          "border-pink-200 dark:border-pink-800",
        ],
        indigo: [
          "bg-white dark:bg-gray-900",
          "border-indigo-200 dark:border-indigo-800",
        ],
        cyan: [
          "bg-white dark:bg-gray-900",
          "border-cyan-200 dark:border-cyan-800",
        ],
        teal: [
          "bg-white dark:bg-gray-900",
          "border-teal-200 dark:border-teal-800",
        ],
        orange: [
          "bg-white dark:bg-gray-900",
          "border-orange-200 dark:border-orange-800",
        ],
        glass: [
          "border-white/20",
          "bg-white/10 backdrop-blur-xl",
          "shadow-2xl shadow-black/10",
          "dark:bg-black/10",
        ],
      },
      size: {
        sm: "h-8 text-xs",
        md: "h-10 text-sm",
        lg: "h-12 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

/**
 * MenubarMenu component styles
 */
export const menubarMenuVariants = cva(["relative inline-flex"]);

/**
 * MenubarTrigger component styles
 */
export const menubarTriggerVariants = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-sm",
    "px-3 py-1.5",
    "font-medium",
    "transition-all duration-200",
    "outline-none",
    "select-none",
    "cursor-pointer",
    "text-gray-700 dark:text-gray-200",
  ],
  {
    variants: {
      variant: {
        default: [
          "hover:bg-gray-100 dark:hover:bg-gray-800",
          "data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-gray-800",
          "data-[state=open]:border data-[state=open]:border-gray-300 dark:data-[state=open]:border-gray-600",
        ],
        bordered: [
          "hover:bg-gray-100 dark:hover:bg-gray-800",
          "data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-gray-800",
          "data-[state=open]:border data-[state=open]:border-gray-400 dark:data-[state=open]:border-gray-500",
        ],
        filled: [
          "hover:bg-gray-200 dark:hover:bg-gray-700",
          "data-[state=open]:bg-gray-200 dark:data-[state=open]:bg-gray-700",
          "data-[state=open]:border data-[state=open]:border-gray-400 dark:data-[state=open]:border-gray-500",
        ],
        ghost: [
          "hover:bg-gray-100 dark:hover:bg-gray-800",
          "data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-gray-800",
          "data-[state=open]:border data-[state=open]:border-gray-300 dark:data-[state=open]:border-gray-600",
        ],
        // Color variants
        primary: [
          "hover:bg-blue-50 dark:hover:bg-blue-950/30",
          "hover:text-blue-600 dark:hover:text-blue-400",
          "data-[state=open]:bg-blue-50 dark:data-[state=open]:bg-blue-950/30",
          "data-[state=open]:text-blue-600 dark:data-[state=open]:text-blue-400",
          "data-[state=open]:border data-[state=open]:border-blue-300 dark:data-[state=open]:border-blue-700",
        ],
        secondary: [
          "hover:bg-purple-50 dark:hover:bg-purple-950/30",
          "hover:text-purple-600 dark:hover:text-purple-400",
          "data-[state=open]:bg-purple-50 dark:data-[state=open]:bg-purple-950/30",
          "data-[state=open]:text-purple-600 dark:data-[state=open]:text-purple-400",
          "data-[state=open]:border data-[state=open]:border-purple-300 dark:data-[state=open]:border-purple-700",
        ],
        success: [
          "hover:bg-green-50 dark:hover:bg-green-950/30",
          "hover:text-green-600 dark:hover:text-green-400",
          "data-[state=open]:bg-green-50 dark:data-[state=open]:bg-green-950/30",
          "data-[state=open]:text-green-600 dark:data-[state=open]:text-green-400",
          "data-[state=open]:border data-[state=open]:border-green-300 dark:data-[state=open]:border-green-700",
        ],
        warning: [
          "hover:bg-yellow-50 dark:hover:bg-yellow-950/30",
          "hover:text-yellow-600 dark:hover:text-yellow-400",
          "data-[state=open]:bg-yellow-50 dark:data-[state=open]:bg-yellow-950/30",
          "data-[state=open]:text-yellow-600 dark:data-[state=open]:text-yellow-400",
          "data-[state=open]:border data-[state=open]:border-yellow-300 dark:data-[state=open]:border-yellow-700",
        ],
        danger: [
          "hover:bg-red-50 dark:hover:bg-red-950/30",
          "hover:text-red-600 dark:hover:text-red-400",
          "data-[state=open]:bg-red-50 dark:data-[state=open]:bg-red-950/30",
          "data-[state=open]:text-red-600 dark:data-[state=open]:text-red-400",
          "data-[state=open]:border data-[state=open]:border-red-300 dark:data-[state=open]:border-red-700",
        ],
        info: [
          "hover:bg-sky-50 dark:hover:bg-sky-950/30",
          "hover:text-sky-600 dark:hover:text-sky-400",
          "data-[state=open]:bg-sky-50 dark:data-[state=open]:bg-sky-950/30",
          "data-[state=open]:text-sky-600 dark:data-[state=open]:text-sky-400",
          "data-[state=open]:border data-[state=open]:border-sky-300 dark:data-[state=open]:border-sky-700",
        ],
        purple: [
          "hover:bg-purple-50 dark:hover:bg-purple-950/30",
          "hover:text-purple-600 dark:hover:text-purple-400",
          "data-[state=open]:bg-purple-50 dark:data-[state=open]:bg-purple-950/30",
          "data-[state=open]:text-purple-600 dark:data-[state=open]:text-purple-400",
          "data-[state=open]:border data-[state=open]:border-purple-300 dark:data-[state=open]:border-purple-700",
        ],
        pink: [
          "hover:bg-pink-50 dark:hover:bg-pink-950/30",
          "hover:text-pink-600 dark:hover:text-pink-400",
          "data-[state=open]:bg-pink-50 dark:data-[state=open]:bg-pink-950/30",
          "data-[state=open]:text-pink-600 dark:data-[state=open]:text-pink-400",
          "data-[state=open]:border data-[state=open]:border-pink-300 dark:data-[state=open]:border-pink-700",
        ],
        indigo: [
          "hover:bg-indigo-50 dark:hover:bg-indigo-950/30",
          "hover:text-indigo-600 dark:hover:text-indigo-400",
          "data-[state=open]:bg-indigo-50 dark:data-[state=open]:bg-indigo-950/30",
          "data-[state=open]:text-indigo-600 dark:data-[state=open]:text-indigo-400",
          "data-[state=open]:border data-[state=open]:border-indigo-300 dark:data-[state=open]:border-indigo-700",
        ],
        cyan: [
          "hover:bg-cyan-50 dark:hover:bg-cyan-950/30",
          "hover:text-cyan-600 dark:hover:text-cyan-400",
          "data-[state=open]:bg-cyan-50 dark:data-[state=open]:bg-cyan-950/30",
          "data-[state=open]:text-cyan-600 dark:data-[state=open]:text-cyan-400",
          "data-[state=open]:border data-[state=open]:border-cyan-300 dark:data-[state=open]:border-cyan-700",
        ],
        teal: [
          "hover:bg-teal-50 dark:hover:bg-teal-950/30",
          "hover:text-teal-600 dark:hover:text-teal-400",
          "data-[state=open]:bg-teal-50 dark:data-[state=open]:bg-teal-950/30",
          "data-[state=open]:text-teal-600 dark:data-[state=open]:text-teal-400",
          "data-[state=open]:border data-[state=open]:border-teal-300 dark:data-[state=open]:border-teal-700",
        ],
        orange: [
          "hover:bg-orange-50 dark:hover:bg-orange-950/30",
          "hover:text-orange-600 dark:hover:text-orange-400",
          "data-[state=open]:bg-orange-50 dark:data-[state=open]:bg-orange-950/30",
          "data-[state=open]:text-orange-600 dark:data-[state=open]:text-orange-400",
          "data-[state=open]:border data-[state=open]:border-orange-300 dark:data-[state=open]:border-orange-700",
        ],
        glass: [
          "hover:bg-white/20 dark:hover:bg-white/15",
          "text-gray-900 dark:text-white",
          "data-[state=open]:bg-white/30 dark:data-[state=open]:bg-white/20",
          "data-[state=open]:border data-[state=open]:border-white/30",
        ],
      },
      disabled: {
        true: ["opacity-50", "cursor-not-allowed", "pointer-events-none"],
        false: [],
      },
    },
    defaultVariants: {
      variant: "default",
      disabled: false,
    },
  }
);

/**
 * MenubarContent component styles
 */
export const menubarContentVariants = cva(
  [
    "absolute z-50",
    "min-w-[12rem]",
    "overflow-hidden",
    "rounded-md",
    "border",
    "p-1",
    "shadow-lg",
    "data-[state=open]:animate-in",
    "data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0",
    "data-[state=open]:fade-in-0",
    "data-[state=closed]:zoom-out-95",
    "data-[state=open]:zoom-in-95",
    "data-[side=bottom]:slide-in-from-top-2",
    "data-[side=left]:slide-in-from-right-2",
    "data-[side=right]:slide-in-from-left-2",
    "data-[side=top]:slide-in-from-bottom-2",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-white dark:bg-gray-900",
          "border-gray-200 dark:border-gray-700",
        ],
        bordered: [
          "bg-white dark:bg-gray-900",
          "border-gray-300 dark:border-gray-600",
        ],
        filled: [
          "bg-gray-50 dark:bg-gray-800",
          "border-gray-200 dark:border-gray-700",
        ],
        ghost: [
          "bg-white dark:bg-gray-900",
          "border-gray-200 dark:border-gray-700",
        ],
        // Color variants
        primary: [
          "bg-white dark:bg-gray-900",
          "border-blue-200 dark:border-blue-800",
        ],
        secondary: [
          "bg-white dark:bg-gray-900",
          "border-purple-200 dark:border-purple-800",
        ],
        success: [
          "bg-white dark:bg-gray-900",
          "border-green-200 dark:border-green-800",
        ],
        warning: [
          "bg-white dark:bg-gray-900",
          "border-yellow-200 dark:border-yellow-800",
        ],
        danger: [
          "bg-white dark:bg-gray-900",
          "border-red-200 dark:border-red-800",
        ],
        info: [
          "bg-white dark:bg-gray-900",
          "border-sky-200 dark:border-sky-800",
        ],
        purple: [
          "bg-white dark:bg-gray-900",
          "border-purple-200 dark:border-purple-800",
        ],
        pink: [
          "bg-white dark:bg-gray-900",
          "border-pink-200 dark:border-pink-800",
        ],
        indigo: [
          "bg-white dark:bg-gray-900",
          "border-indigo-200 dark:border-indigo-800",
        ],
        cyan: [
          "bg-white dark:bg-gray-900",
          "border-cyan-200 dark:border-cyan-800",
        ],
        teal: [
          "bg-white dark:bg-gray-900",
          "border-teal-200 dark:border-teal-800",
        ],
        orange: [
          "bg-white dark:bg-gray-900",
          "border-orange-200 dark:border-orange-800",
        ],
        glass: [
          "border-white/20",
          "bg-white/10 backdrop-blur-xl",
          "shadow-2xl shadow-black/10",
          "dark:bg-black/10",
        ],
      },
      align: {
        start: "left-0",
        center: "left-1/2 -translate-x-1/2",
        end: "right-0",
      },
      side: {
        top: "bottom-full mb-1",
        bottom: "top-full mt-1",
        left: "right-full mr-1",
        right: "left-full ml-1",
      },
    },
    defaultVariants: {
      variant: "default",
      align: "start",
      side: "bottom",
    },
  }
);

/**
 * MenubarItem component styles
 */
export const menubarItemVariants = cva(
  [
    "relative flex items-center",
    "rounded-sm",
    "px-2 py-1.5",
    "text-sm",
    "outline-none",
    "select-none",
    "cursor-pointer",
    "transition-colors duration-200",
    "w-full",
    "text-gray-700 dark:text-gray-200",
  ],
  {
    variants: {
      variant: {
        default: [
          "hover:bg-gray-100 dark:hover:bg-gray-800",
          "focus:bg-gray-100 dark:focus:bg-gray-800",
          "data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-gray-800",
          "data-[state=open]:border data-[state=open]:border-gray-300 dark:data-[state=open]:border-gray-600",
        ],
        bordered: [
          "hover:bg-gray-100 dark:hover:bg-gray-800",
          "focus:bg-gray-100 dark:focus:bg-gray-800",
          "data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-gray-800",
          "data-[state=open]:border data-[state=open]:border-gray-400 dark:data-[state=open]:border-gray-500",
        ],
        filled: [
          "hover:bg-gray-200 dark:hover:bg-gray-700",
          "focus:bg-gray-200 dark:focus:bg-gray-700",
          "data-[state=open]:bg-gray-200 dark:data-[state=open]:bg-gray-700",
          "data-[state=open]:border data-[state=open]:border-gray-400 dark:data-[state=open]:border-gray-500",
        ],
        ghost: [
          "hover:bg-gray-100 dark:hover:bg-gray-800",
          "focus:bg-gray-100 dark:focus:bg-gray-800",
          "data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-gray-800",
          "data-[state=open]:border data-[state=open]:border-gray-300 dark:data-[state=open]:border-gray-600",
        ],
        // Color variants
        primary: [
          "hover:bg-blue-50 dark:hover:bg-blue-950/30",
          "hover:text-blue-600 dark:hover:text-blue-400",
          "focus:bg-blue-50 dark:focus:bg-blue-950/30",
          "focus:text-blue-600 dark:focus:text-blue-400",
          "data-[state=open]:bg-blue-50 dark:data-[state=open]:bg-blue-950/30",
          "data-[state=open]:text-blue-600 dark:data-[state=open]:text-blue-400",
          "data-[state=open]:border data-[state=open]:border-blue-300 dark:data-[state=open]:border-blue-700",
        ],
        secondary: [
          "hover:bg-purple-50 dark:hover:bg-purple-950/30",
          "hover:text-purple-600 dark:hover:text-purple-400",
          "focus:bg-purple-50 dark:focus:bg-purple-950/30",
          "focus:text-purple-600 dark:focus:text-purple-400",
          "data-[state=open]:bg-purple-50 dark:data-[state=open]:bg-purple-950/30",
          "data-[state=open]:text-purple-600 dark:data-[state=open]:text-purple-400",
          "data-[state=open]:border data-[state=open]:border-purple-300 dark:data-[state=open]:border-purple-700",
        ],
        success: [
          "hover:bg-green-50 dark:hover:bg-green-950/30",
          "hover:text-green-600 dark:hover:text-green-400",
          "focus:bg-green-50 dark:focus:bg-green-950/30",
          "focus:text-green-600 dark:focus:text-green-400",
          "data-[state=open]:bg-green-50 dark:data-[state=open]:bg-green-950/30",
          "data-[state=open]:text-green-600 dark:data-[state=open]:text-green-400",
          "data-[state=open]:border data-[state=open]:border-green-300 dark:data-[state=open]:border-green-700",
        ],
        warning: [
          "hover:bg-yellow-50 dark:hover:bg-yellow-950/30",
          "hover:text-yellow-600 dark:hover:text-yellow-400",
          "focus:bg-yellow-50 dark:focus:bg-yellow-950/30",
          "focus:text-yellow-600 dark:focus:text-yellow-400",
          "data-[state=open]:bg-yellow-50 dark:data-[state=open]:bg-yellow-950/30",
          "data-[state=open]:text-yellow-600 dark:data-[state=open]:text-yellow-400",
          "data-[state=open]:border data-[state=open]:border-yellow-300 dark:data-[state=open]:border-yellow-700",
        ],
        danger: [
          "hover:bg-red-50 dark:hover:bg-red-950/30",
          "hover:text-red-600 dark:hover:text-red-400",
          "focus:bg-red-50 dark:focus:bg-red-950/30",
          "focus:text-red-600 dark:focus:text-red-400",
          "data-[state=open]:bg-red-50 dark:data-[state=open]:bg-red-950/30",
          "data-[state=open]:text-red-600 dark:data-[state=open]:text-red-400",
          "data-[state=open]:border data-[state=open]:border-red-300 dark:data-[state=open]:border-red-700",
        ],
        info: [
          "hover:bg-sky-50 dark:hover:bg-sky-950/30",
          "hover:text-sky-600 dark:hover:text-sky-400",
          "focus:bg-sky-50 dark:focus:bg-sky-950/30",
          "focus:text-sky-600 dark:focus:text-sky-400",
          "data-[state=open]:bg-sky-50 dark:data-[state=open]:bg-sky-950/30",
          "data-[state=open]:text-sky-600 dark:data-[state=open]:text-sky-400",
          "data-[state=open]:border data-[state=open]:border-sky-300 dark:data-[state=open]:border-sky-700",
        ],
        purple: [
          "hover:bg-purple-50 dark:hover:bg-purple-950/30",
          "hover:text-purple-600 dark:hover:text-purple-400",
          "focus:bg-purple-50 dark:focus:bg-purple-950/30",
          "focus:text-purple-600 dark:focus:text-purple-400",
          "data-[state=open]:bg-purple-50 dark:data-[state=open]:bg-purple-950/30",
          "data-[state=open]:text-purple-600 dark:data-[state=open]:text-purple-400",
          "data-[state=open]:border data-[state=open]:border-purple-300 dark:data-[state=open]:border-purple-700",
        ],
        pink: [
          "hover:bg-pink-50 dark:hover:bg-pink-950/30",
          "hover:text-pink-600 dark:hover:text-pink-400",
          "focus:bg-pink-50 dark:focus:bg-pink-950/30",
          "focus:text-pink-600 dark:focus:text-pink-400",
          "data-[state=open]:bg-pink-50 dark:data-[state=open]:bg-pink-950/30",
          "data-[state=open]:text-pink-600 dark:data-[state=open]:text-pink-400",
          "data-[state=open]:border data-[state=open]:border-pink-300 dark:data-[state=open]:border-pink-700",
        ],
        indigo: [
          "hover:bg-indigo-50 dark:hover:bg-indigo-950/30",
          "hover:text-indigo-600 dark:hover:text-indigo-400",
          "focus:bg-indigo-50 dark:focus:bg-indigo-950/30",
          "focus:text-indigo-600 dark:focus:text-indigo-400",
          "data-[state=open]:bg-indigo-50 dark:data-[state=open]:bg-indigo-950/30",
          "data-[state=open]:text-indigo-600 dark:data-[state=open]:text-indigo-400",
          "data-[state=open]:border data-[state=open]:border-indigo-300 dark:data-[state=open]:border-indigo-700",
        ],
        cyan: [
          "hover:bg-cyan-50 dark:hover:bg-cyan-950/30",
          "hover:text-cyan-600 dark:hover:text-cyan-400",
          "focus:bg-cyan-50 dark:focus:bg-cyan-950/30",
          "focus:text-cyan-600 dark:focus:text-cyan-400",
          "data-[state=open]:bg-cyan-50 dark:data-[state=open]:bg-cyan-950/30",
          "data-[state=open]:text-cyan-600 dark:data-[state=open]:text-cyan-400",
          "data-[state=open]:border data-[state=open]:border-cyan-300 dark:data-[state=open]:border-cyan-700",
        ],
        teal: [
          "hover:bg-teal-50 dark:hover:bg-teal-950/30",
          "hover:text-teal-600 dark:hover:text-teal-400",
          "focus:bg-teal-50 dark:focus:bg-teal-950/30",
          "focus:text-teal-600 dark:focus:text-teal-400",
          "data-[state=open]:bg-teal-50 dark:data-[state=open]:bg-teal-950/30",
          "data-[state=open]:text-teal-600 dark:data-[state=open]:text-teal-400",
          "data-[state=open]:border data-[state=open]:border-teal-300 dark:data-[state=open]:border-teal-700",
        ],
        orange: [
          "hover:bg-orange-50 dark:hover:bg-orange-950/30",
          "hover:text-orange-600 dark:hover:text-orange-400",
          "focus:bg-orange-50 dark:focus:bg-orange-950/30",
          "focus:text-orange-600 dark:focus:text-orange-400",
          "data-[state=open]:bg-orange-50 dark:data-[state=open]:bg-orange-950/30",
          "data-[state=open]:text-orange-600 dark:data-[state=open]:text-orange-400",
          "data-[state=open]:border data-[state=open]:border-orange-300 dark:data-[state=open]:border-orange-700",
        ],
        glass: [
          "hover:bg-white/20 dark:hover:bg-white/15",
          "text-gray-900 dark:text-white",
          "focus:bg-white/25 dark:focus:bg-white/20",
          "data-[state=open]:bg-white/30 dark:data-[state=open]:bg-white/20",
          "data-[state=open]:border data-[state=open]:border-white/30",
        ],
      },
      disabled: {
        true: ["opacity-50", "cursor-not-allowed", "pointer-events-none"],
        false: [],
      },
      inset: {
        true: "pl-8",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      disabled: false,
      inset: false,
    },
  }
);

/**
 * MenubarSeparator component styles
 */
export const menubarSeparatorVariants = cva([
  "h-px",
  "my-1",
  "bg-gray-200 dark:bg-gray-700",
]);

/**
 * MenubarShortcut component styles
 */
export const menubarShortcutVariants = cva([
  "ml-auto",
  "text-xs",
  "tracking-widest",
  "text-gray-400 dark:text-gray-500",
  "font-mono",
]);

/**
 * MenubarLabel component styles
 */
export const menubarLabelVariants = cva(
  [
    "px-2 py-1.5",
    "text-xs",
    "font-semibold",
    "text-gray-500 dark:text-gray-400",
  ],
  {
    variants: {
      inset: {
        true: "pl-8",
        false: "",
      },
    },
    defaultVariants: {
      inset: false,
    },
  }
);

/**
 * MenubarCheckboxItem indicator styles
 */
export const menubarCheckboxIndicatorVariants = cva([
  "absolute left-2",
  "inline-flex items-center justify-center",
  "w-4 h-4",
]);

/**
 * MenubarRadioItem indicator styles
 */
export const menubarRadioIndicatorVariants = cva([
  "absolute left-2",
  "inline-flex items-center justify-center",
  "w-4 h-4",
]);

/**
 * MenubarSubTrigger icon styles
 */
export const menubarSubTriggerIconVariants = cva(["ml-auto", "w-4 h-4"]);
