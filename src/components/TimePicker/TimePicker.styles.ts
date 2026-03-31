import { cva } from "class-variance-authority";

/**
 * TimePicker input variant styles
 */
export const timePickerVariants = cva(
  [
    "w-full",
    "inline-flex",
    "items-center",
    "justify-between",
    "gap-2",
    "font-medium",
    "transition-all",
    "duration-200",
    "border",
    "cursor-pointer",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
    "disabled:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-base-200",
          "text-base-content",
          "border-base-300",
          "hover:bg-base-300",
          "focus:ring-primary",
        ],
        primary: [
          "bg-primary/10",
          "text-primary",
          "border-primary/20",
          "hover:bg-primary/20",
          "focus:ring-primary",
        ],
        secondary: [
          "bg-secondary/10",
          "text-secondary",
          "border-secondary/20",
          "hover:bg-secondary/20",
          "focus:ring-secondary",
        ],
        accent: [
          "bg-accent/10",
          "text-accent",
          "border-accent/20",
          "hover:bg-accent/20",
          "focus:ring-accent",
        ],
        success: [
          "bg-success/10",
          "text-success",
          "border-success/20",
          "hover:bg-success/20",
          "focus:ring-success",
        ],
        warning: [
          "bg-warning/10",
          "text-warning",
          "border-warning/20",
          "hover:bg-warning/20",
          "focus:ring-warning",
        ],
        danger: [
          "bg-destructive/10",
          "text-destructive",
          "border-destructive/20",
          "hover:bg-destructive/20",
          "focus:ring-destructive",
        ],
        info: [
          "bg-info/10",
          "text-info",
          "border-info/20",
          "hover:bg-info/20",
          "focus:ring-info",
        ],
        glass: [
          "backdrop-blur-xl",
          "bg-white/30",
          "dark:bg-gray-900/40",
          "border-white/40",
          "dark:border-white/20",
          "text-base-content",
          "hover:bg-white/40",
          "dark:hover:bg-gray-900/50",
          "focus:ring-primary",
        ],
        bordered: [
          "bg-base-100",
          "text-base-content",
          "border-2",
          "border-base-300",
          "hover:bg-base-200",
          "focus:ring-primary",
        ],
        elevated: [
          "bg-base-100",
          "text-base-content",
          "border-base-300",
          "shadow-lg",
          "hover:shadow-xl",
          "focus:ring-primary",
        ],
        flat: [
          "bg-base-200",
          "text-base-content",
          "border-transparent",
          "hover:bg-base-300",
          "focus:ring-primary",
        ],
        outlined: [
          "bg-transparent",
          "text-base-content",
          "border-base-content/20",
          "hover:bg-base-content/5",
          "hover:border-base-content/30",
          "focus:ring-base-content/20",
        ],
        minimal: [
          "bg-transparent",
          "text-base-content",
          "border-transparent",
          "hover:bg-base-200",
          "focus:ring-primary",
        ],
      },
      size: {
        xs: ["h-7", "px-1.5", "text-xs", "rounded"],
        sm: ["h-8", "px-2", "text-sm", "rounded-md"],
        md: ["h-10", "px-3", "text-base", "rounded-lg"],
        lg: ["h-12", "px-4", "text-lg", "rounded-lg"],
        xl: ["h-14", "px-5", "text-xl", "rounded-xl"],
        "2xl": ["h-16", "px-6", "text-2xl", "rounded-xl"],
        "3xl": ["h-20", "px-7", "text-3xl", "rounded-2xl"],
        "4xl": ["h-24", "px-8", "text-4xl", "rounded-2xl"],
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

/**
 * Time dropdown container styles
 */
export const timeDropdownVariants = cva(
  ["shadow-2xl", "border", "rounded-lg", "overflow-hidden", "backdrop-blur-xl"],
  {
    variants: {
      variant: {
        default: [
          "bg-white",
          "dark:bg-gray-800",
          "border-base-300",
          "text-base-content",
        ],
        primary: [
          "bg-white",
          "dark:bg-gray-800",
          "border-primary/20",
          "text-base-content",
        ],
        secondary: [
          "bg-white",
          "dark:bg-gray-800",
          "border-secondary/20",
          "text-base-content",
        ],
        accent: [
          "bg-white",
          "dark:bg-gray-800",
          "border-accent/20",
          "text-base-content",
        ],
        success: [
          "bg-white",
          "dark:bg-gray-800",
          "border-success/20",
          "text-base-content",
        ],
        warning: [
          "bg-white",
          "dark:bg-gray-800",
          "border-warning/20",
          "text-base-content",
        ],
        danger: [
          "bg-white",
          "dark:bg-gray-800",
          "border-destructive/20",
          "text-base-content",
        ],
        info: [
          "bg-white",
          "dark:bg-gray-800",
          "border-info/20",
          "text-base-content",
        ],
        glass: [
          "bg-white/60",
          "dark:bg-slate-900/60",
          "border-white/30",
          "dark:border-white/10",
        ],
        bordered: [
          "bg-white/95",
          "dark:bg-slate-900/95",
          "border-2",
          "border-slate-300",
          "dark:border-slate-600",
        ],
        elevated: [
          "bg-white",
          "dark:bg-slate-900",
          "border-slate-100",
          "dark:border-slate-800",
          "shadow-2xl",
        ],
        flat: [
          "bg-white/95",
          "dark:bg-slate-900/95",
          "border-slate-200",
          "dark:border-slate-700",
        ],
        outlined: [
          "bg-white/95",
          "dark:bg-slate-900/95",
          "border-slate-300",
          "dark:border-slate-600",
        ],
        minimal: [
          "bg-white/95",
          "dark:bg-slate-900/95",
          "border-slate-200",
          "dark:border-slate-700",
        ],
        gradient: [
          "bg-gradient-to-br",
          "from-white/90",
          "via-slate-50/90",
          "to-white/90",
          "dark:from-slate-900/90",
          "dark:via-slate-800/90",
          "dark:to-slate-900/90",
          "border-white/30",
          "dark:border-white/10",
        ],
        neon: ["bg-slate-950/95", "border-cyan-500/50", "shadow-cyan-500/20"],
        aurora: [
          "bg-gradient-to-br",
          "from-emerald-50/90",
          "via-cyan-50/90",
          "to-blue-50/90",
          "dark:from-emerald-950/80",
          "dark:via-cyan-950/80",
          "dark:to-blue-950/80",
          "border-emerald-200/50",
          "dark:border-emerald-700/30",
        ],
        cosmic: [
          "bg-gradient-to-br",
          "from-violet-950/95",
          "via-purple-900/95",
          "to-fuchsia-950/95",
          "border-violet-500/30",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Time picker container styles
 */
export const timePickerContainerVariants = cva(["p-5", "w-[360px]"]);

/**
 * Time columns container styles
 */
export const timeColumnsContainerVariants = cva([
  "flex",
  "gap-3",
  "justify-center",
  "items-start",
]);

/**
 * Time column styles
 */
export const timeColumnVariants = cva(
  [
    "flex",
    "flex-col",
    "h-[220px]",
    "overflow-y-auto",
    "rounded-xl",
    "relative",
    "p-1",
    "border",
    "scrollbar-thin",
    "scrollbar-thumb-slate-300",
    "dark:scrollbar-thumb-slate-600",
    "scrollbar-track-transparent",
    "scroll-smooth",
    "overscroll-contain",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-slate-100",
          "dark:border-slate-800",
          "bg-slate-50/50",
          "dark:bg-slate-800/50",
        ],
        primary: [
          "border-blue-100",
          "dark:border-blue-900/50",
          "bg-blue-50/30",
          "dark:bg-blue-950/30",
        ],
        secondary: [
          "border-purple-100",
          "dark:border-purple-900/50",
          "bg-purple-50/30",
          "dark:bg-purple-950/30",
        ],
        accent: [
          "border-pink-100",
          "dark:border-pink-900/50",
          "bg-pink-50/30",
          "dark:bg-pink-950/30",
        ],
        success: [
          "border-emerald-100",
          "dark:border-emerald-900/50",
          "bg-emerald-50/30",
          "dark:bg-emerald-950/30",
        ],
        warning: [
          "border-amber-100",
          "dark:border-amber-900/50",
          "bg-amber-50/30",
          "dark:bg-amber-950/30",
        ],
        danger: [
          "border-rose-100",
          "dark:border-rose-900/50",
          "bg-rose-50/30",
          "dark:bg-rose-950/30",
        ],
        info: [
          "border-cyan-100",
          "dark:border-cyan-900/50",
          "bg-cyan-50/30",
          "dark:bg-cyan-950/30",
        ],
        glass: [
          "border-white/20",
          "dark:border-white/10",
          "bg-white/30",
          "dark:bg-white/5",
        ],
        bordered: [
          "border-slate-200",
          "dark:border-slate-700",
          "bg-white/50",
          "dark:bg-slate-800/50",
        ],
        elevated: [
          "border-slate-100",
          "dark:border-slate-800",
          "bg-white",
          "dark:bg-slate-800",
          "shadow-inner",
        ],
        flat: [
          "border-slate-100",
          "dark:border-slate-800",
          "bg-slate-100/50",
          "dark:bg-slate-800/50",
        ],
        outlined: [
          "border-slate-200",
          "dark:border-slate-700",
          "bg-transparent",
        ],
        minimal: [
          "border-transparent",
          "bg-slate-50/50",
          "dark:bg-slate-800/50",
        ],
        gradient: [
          "border-white/20",
          "bg-gradient-to-b",
          "from-white/50",
          "to-white/30",
          "dark:from-slate-800/50",
          "dark:to-slate-800/30",
        ],
        neon: ["border-cyan-500/30", "bg-slate-900/50"],
        aurora: [
          "border-emerald-200/30",
          "dark:border-emerald-700/20",
          "bg-white/30",
          "dark:bg-slate-900/30",
        ],
        cosmic: ["border-violet-500/20", "bg-violet-950/30"],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Time item styles
 */
export const timeItemVariants = cva(
  [
    "flex",
    "items-center",
    "justify-center",
    "min-w-[56px]",
    "h-12",
    "py-2",
    "px-3",
    "text-sm",
    "font-semibold",
    "transition-all",
    "duration-200",
    "cursor-pointer",
    "select-none",
    "relative",
    "overflow-hidden",
  ],
  {
    variants: {
      variant: {
        default: [],
        primary: [],
        secondary: [],
        accent: [],
        success: [],
        warning: [],
        danger: [],
        info: [],
        glass: [],
        bordered: [],
        elevated: [],
        flat: [],
        outlined: [],
        minimal: [],
        gradient: [],
        neon: [],
        aurora: [],
        cosmic: [],
      },
      state: {
        default: [
          "text-slate-600",
          "dark:text-slate-400",
          "hover:bg-slate-100",
          "dark:hover:bg-slate-700",
          "hover:text-slate-900",
          "dark:hover:text-slate-100",
        ],
        selected: [],
        disabled: [
          "text-slate-300",
          "dark:text-slate-600",
          "cursor-not-allowed",
          "hover:bg-transparent",
        ],
      },
    },
    compoundVariants: [
      // Default selected states
      {
        variant: "default",
        state: "selected",
        class: [
          "bg-blue-500",
          "text-white",
          "shadow-lg",
          "shadow-blue-500/30",
          "hover:bg-blue-600",
          "scale-[1.02]",
        ],
      },
      // Primary
      {
        variant: "primary",
        state: "selected",
        class: ["bg-blue-500", "text-white", "shadow-lg", "shadow-blue-500/30"],
      },
      {
        variant: "primary",
        state: "default",
        class: ["hover:bg-blue-100", "dark:hover:bg-blue-900/50"],
      },
      // Secondary
      {
        variant: "secondary",
        state: "selected",
        class: [
          "bg-purple-500",
          "text-white",
          "shadow-lg",
          "shadow-purple-500/30",
        ],
      },
      {
        variant: "secondary",
        state: "default",
        class: ["hover:bg-purple-100", "dark:hover:bg-purple-900/50"],
      },
      // Accent
      {
        variant: "accent",
        state: "selected",
        class: ["bg-pink-500", "text-white", "shadow-lg", "shadow-pink-500/30"],
      },
      {
        variant: "accent",
        state: "default",
        class: ["hover:bg-pink-100", "dark:hover:bg-pink-900/50"],
      },
      // Success
      {
        variant: "success",
        state: "selected",
        class: [
          "bg-emerald-500",
          "text-white",
          "shadow-lg",
          "shadow-emerald-500/30",
        ],
      },
      {
        variant: "success",
        state: "default",
        class: ["hover:bg-emerald-100", "dark:hover:bg-emerald-900/50"],
      },
      // Warning
      {
        variant: "warning",
        state: "selected",
        class: [
          "bg-amber-500",
          "text-white",
          "shadow-lg",
          "shadow-amber-500/30",
        ],
      },
      {
        variant: "warning",
        state: "default",
        class: ["hover:bg-amber-100", "dark:hover:bg-amber-900/50"],
      },
      // Danger
      {
        variant: "danger",
        state: "selected",
        class: ["bg-rose-500", "text-white", "shadow-lg", "shadow-rose-500/30"],
      },
      {
        variant: "danger",
        state: "default",
        class: ["hover:bg-rose-100", "dark:hover:bg-rose-900/50"],
      },
      // Info
      {
        variant: "info",
        state: "selected",
        class: ["bg-cyan-500", "text-white", "shadow-lg", "shadow-cyan-500/30"],
      },
      {
        variant: "info",
        state: "default",
        class: ["hover:bg-cyan-100", "dark:hover:bg-cyan-900/50"],
      },
      // Glass
      {
        variant: "glass",
        state: "selected",
        class: [
          "bg-white/80",
          "dark:bg-white/20",
          "text-slate-900",
          "dark:text-white",
          "backdrop-blur-lg",
          "shadow-lg",
        ],
      },
      {
        variant: "glass",
        state: "default",
        class: ["hover:bg-white/40", "dark:hover:bg-white/10"],
      },
      // Neon
      {
        variant: "neon",
        state: "selected",
        class: [
          "bg-cyan-500",
          "text-white",
          "shadow-lg",
          "shadow-cyan-500/50",
          "border",
          "border-cyan-400",
        ],
      },
      {
        variant: "neon",
        state: "default",
        class: ["text-cyan-400", "hover:bg-cyan-500/20", "hover:text-cyan-300"],
      },
      // Aurora
      {
        variant: "aurora",
        state: "selected",
        class: [
          "bg-gradient-to-r",
          "from-emerald-500",
          "to-cyan-500",
          "text-white",
          "shadow-lg",
          "shadow-emerald-500/30",
        ],
      },
      {
        variant: "aurora",
        state: "default",
        class: ["hover:bg-emerald-100/50", "dark:hover:bg-emerald-900/30"],
      },
      // Cosmic
      {
        variant: "cosmic",
        state: "selected",
        class: [
          "bg-gradient-to-r",
          "from-violet-500",
          "to-fuchsia-500",
          "text-white",
          "shadow-lg",
          "shadow-violet-500/30",
        ],
      },
      {
        variant: "cosmic",
        state: "default",
        class: [
          "text-violet-300",
          "hover:bg-violet-500/20",
          "hover:text-violet-200",
        ],
      },
    ],
    defaultVariants: {
      variant: "default",
      state: "default",
    },
  }
);

/**
 * AM/PM selector styles
 */
export const amPmSelectorVariants = cva(
  [
    "flex",
    "flex-col",
    "h-[220px]",
    "overflow-hidden",
    "rounded-xl",
    "border",
    "ml-1",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-slate-100",
          "dark:border-slate-800",
          "bg-slate-50/50",
          "dark:bg-slate-800/50",
        ],
        primary: ["border-blue-100", "bg-blue-50/30", "dark:bg-blue-950/30"],
        secondary: [
          "border-purple-100",
          "bg-purple-50/30",
          "dark:bg-purple-950/30",
        ],
        accent: ["border-pink-100", "bg-pink-50/30", "dark:bg-pink-950/30"],
        success: [
          "border-emerald-100",
          "bg-emerald-50/30",
          "dark:bg-emerald-950/30",
        ],
        warning: ["border-amber-100", "bg-amber-50/30", "dark:bg-amber-950/30"],
        danger: ["border-rose-100", "bg-rose-50/30", "dark:bg-rose-950/30"],
        info: ["border-cyan-100", "bg-cyan-50/30", "dark:bg-cyan-950/30"],
        glass: ["border-white/20", "bg-white/30", "dark:bg-white/5"],
        bordered: ["border-slate-200", "bg-white/50", "dark:bg-slate-800/50"],
        elevated: [
          "border-slate-100",
          "bg-white",
          "dark:bg-slate-800",
          "shadow-inner",
        ],
        flat: ["border-slate-100", "bg-slate-100/50", "dark:bg-slate-800/50"],
        outlined: ["border-slate-200", "bg-transparent"],
        minimal: [
          "border-transparent",
          "bg-slate-50/50",
          "dark:bg-slate-800/50",
        ],
        gradient: [
          "border-white/20",
          "bg-gradient-to-b",
          "from-white/50",
          "to-white/30",
        ],
        neon: ["border-cyan-500/30", "bg-slate-900/50"],
        aurora: [
          "border-emerald-200/30",
          "bg-white/30",
          "dark:bg-slate-900/30",
        ],
        cosmic: ["border-violet-500/20", "bg-violet-950/30"],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * AM/PM button styles
 */
export const amPmButtonVariants = cva(
  [
    "flex",
    "items-center",
    "justify-center",
    "min-w-[56px]",
    "flex-1",
    "px-3",
    "text-sm",
    "font-bold",
    "transition-all",
    "duration-200",
    "cursor-pointer",
    "select-none",
    "tracking-wide",
  ],
  {
    variants: {
      variant: {
        default: [],
        primary: [],
        secondary: [],
        accent: [],
        success: [],
        warning: [],
        danger: [],
        info: [],
        glass: [],
        bordered: [],
        elevated: [],
        flat: [],
        outlined: [],
        minimal: [],
        gradient: [],
        neon: [],
        aurora: [],
        cosmic: [],
      },
      state: {
        default: [
          "text-slate-500",
          "dark:text-slate-400",
          "hover:bg-slate-100",
          "dark:hover:bg-slate-700",
        ],
        selected: [],
      },
    },
    compoundVariants: [
      {
        variant: "default",
        state: "selected",
        class: ["bg-blue-500", "text-white", "shadow-lg", "shadow-blue-500/30"],
      },
      {
        variant: "primary",
        state: "selected",
        class: ["bg-blue-500", "text-white", "shadow-lg", "shadow-blue-500/30"],
      },
      {
        variant: "secondary",
        state: "selected",
        class: [
          "bg-purple-500",
          "text-white",
          "shadow-lg",
          "shadow-purple-500/30",
        ],
      },
      {
        variant: "accent",
        state: "selected",
        class: ["bg-pink-500", "text-white", "shadow-lg", "shadow-pink-500/30"],
      },
      {
        variant: "success",
        state: "selected",
        class: [
          "bg-emerald-500",
          "text-white",
          "shadow-lg",
          "shadow-emerald-500/30",
        ],
      },
      {
        variant: "warning",
        state: "selected",
        class: [
          "bg-amber-500",
          "text-white",
          "shadow-lg",
          "shadow-amber-500/30",
        ],
      },
      {
        variant: "danger",
        state: "selected",
        class: ["bg-rose-500", "text-white", "shadow-lg", "shadow-rose-500/30"],
      },
      {
        variant: "info",
        state: "selected",
        class: ["bg-cyan-500", "text-white", "shadow-lg", "shadow-cyan-500/30"],
      },
      {
        variant: "glass",
        state: "selected",
        class: [
          "bg-white/80",
          "dark:bg-white/20",
          "text-slate-900",
          "dark:text-white",
          "backdrop-blur-lg",
        ],
      },
      {
        variant: "neon",
        state: "selected",
        class: ["bg-cyan-500", "text-white", "shadow-lg", "shadow-cyan-500/50"],
      },
      {
        variant: "neon",
        state: "default",
        class: ["text-cyan-400", "hover:bg-cyan-500/20"],
      },
      {
        variant: "aurora",
        state: "selected",
        class: [
          "bg-gradient-to-r",
          "from-emerald-500",
          "to-cyan-500",
          "text-white",
        ],
      },
      {
        variant: "cosmic",
        state: "selected",
        class: [
          "bg-gradient-to-r",
          "from-violet-500",
          "to-fuchsia-500",
          "text-white",
        ],
      },
      {
        variant: "cosmic",
        state: "default",
        class: ["text-violet-300", "hover:bg-violet-500/20"],
      },
    ],
    defaultVariants: {
      variant: "default",
      state: "default",
    },
  }
);

/**
 * Column label styles
 */
export const columnLabelVariants = cva([
  "text-center",
  "text-[10px]",
  "font-bold",
  "text-slate-400",
  "dark:text-slate-500",
  "py-1.5",
  "uppercase",
  "tracking-widest",
]);

/**
 * Separator styles between columns
 */
export const columnSeparatorVariants = cva([
  "flex",
  "items-center",
  "justify-center",
  "text-slate-300",
  "dark:text-slate-600",
  "font-bold",
  "text-xl",
  "select-none",
  "w-3",
]);

/**
 * Shortcuts sidebar styles
 */
export const shortcutsSidebarVariants = cva(
  ["border-r", "py-3", "px-2", "min-w-[140px]", "space-y-1"],
  {
    variants: {
      variant: {
        default: ["border-slate-100", "dark:border-slate-800"],
        primary: ["border-blue-100", "dark:border-blue-900/50"],
        secondary: ["border-purple-100", "dark:border-purple-900/50"],
        accent: ["border-pink-100", "dark:border-pink-900/50"],
        success: ["border-emerald-100", "dark:border-emerald-900/50"],
        warning: ["border-amber-100", "dark:border-amber-900/50"],
        danger: ["border-rose-100", "dark:border-rose-900/50"],
        info: ["border-cyan-100", "dark:border-cyan-900/50"],
        glass: ["border-white/20"],
        bordered: ["border-slate-200"],
        elevated: ["border-slate-100"],
        flat: ["border-slate-100"],
        outlined: ["border-slate-200"],
        minimal: ["border-slate-100"],
        gradient: ["border-white/20"],
        neon: ["border-cyan-500/30"],
        aurora: ["border-emerald-200/30"],
        cosmic: ["border-violet-500/20"],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Shortcut button styles
 */
export const shortcutButtonVariants = cva(
  [
    "w-full",
    "text-left",
    "px-3",
    "py-2",
    "rounded-lg",
    "text-[13px]",
    "font-medium",
    "transition-all",
    "duration-200",
    "flex",
    "items-center",
    "gap-2",
  ],
  {
    variants: {
      variant: {
        default: [
          "text-slate-600",
          "dark:text-slate-400",
          "hover:bg-slate-100",
          "dark:hover:bg-slate-800",
          "hover:text-slate-900",
          "dark:hover:text-slate-100",
        ],
        primary: [
          "hover:bg-blue-100",
          "dark:hover:bg-blue-900/50",
          "hover:text-blue-700",
          "dark:hover:text-blue-300",
        ],
        secondary: [
          "hover:bg-purple-100",
          "dark:hover:bg-purple-900/50",
          "hover:text-purple-700",
        ],
        accent: [
          "hover:bg-pink-100",
          "dark:hover:bg-pink-900/50",
          "hover:text-pink-700",
        ],
        success: [
          "hover:bg-emerald-100",
          "dark:hover:bg-emerald-900/50",
          "hover:text-emerald-700",
        ],
        warning: [
          "hover:bg-amber-100",
          "dark:hover:bg-amber-900/50",
          "hover:text-amber-700",
        ],
        danger: [
          "hover:bg-rose-100",
          "dark:hover:bg-rose-900/50",
          "hover:text-rose-700",
        ],
        info: [
          "hover:bg-cyan-100",
          "dark:hover:bg-cyan-900/50",
          "hover:text-cyan-700",
        ],
        glass: ["hover:bg-white/30", "dark:hover:bg-white/10"],
        bordered: ["hover:bg-slate-100", "dark:hover:bg-slate-800"],
        elevated: ["hover:bg-slate-100", "dark:hover:bg-slate-800"],
        flat: ["hover:bg-slate-200", "dark:hover:bg-slate-700"],
        outlined: ["hover:bg-slate-100", "dark:hover:bg-slate-800"],
        minimal: ["hover:bg-slate-100", "dark:hover:bg-slate-800"],
        gradient: ["hover:bg-white/30"],
        neon: ["text-cyan-400", "hover:bg-cyan-500/20", "hover:text-cyan-300"],
        aurora: [
          "hover:bg-emerald-100/50",
          "dark:hover:bg-emerald-900/30",
          "hover:text-emerald-700",
        ],
        cosmic: [
          "text-violet-300",
          "hover:bg-violet-500/20",
          "hover:text-violet-200",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Footer styles
 */
export const footerVariants = cva(
  [
    "border-t",
    "px-4",
    "py-3",
    "flex",
    "items-center",
    "justify-between",
    "gap-2",
  ],
  {
    variants: {
      variant: {
        default: ["border-slate-100", "dark:border-slate-800"],
        primary: ["border-blue-100", "dark:border-blue-900/50"],
        secondary: ["border-purple-100", "dark:border-purple-900/50"],
        accent: ["border-pink-100", "dark:border-pink-900/50"],
        success: ["border-emerald-100", "dark:border-emerald-900/50"],
        warning: ["border-amber-100", "dark:border-amber-900/50"],
        danger: ["border-rose-100", "dark:border-rose-900/50"],
        info: ["border-cyan-100", "dark:border-cyan-900/50"],
        glass: ["border-white/20"],
        bordered: ["border-slate-200"],
        elevated: ["border-slate-100"],
        flat: ["border-slate-100"],
        outlined: ["border-slate-200"],
        minimal: ["border-slate-100"],
        gradient: ["border-white/20"],
        neon: ["border-cyan-500/30"],
        aurora: ["border-emerald-200/30"],
        cosmic: ["border-violet-500/20"],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Footer cancel button styles
 */
export const footerCancelButtonVariants = cva(
  [
    "px-4",
    "py-2",
    "text-sm",
    "font-medium",
    "border",
    "rounded-lg",
    "transition-all",
    "duration-200",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-slate-200",
          "dark:border-slate-700",
          "text-slate-600",
          "dark:text-slate-400",
          "hover:bg-slate-100",
          "dark:hover:bg-slate-800",
        ],
        primary: ["border-blue-200", "text-blue-600", "hover:bg-blue-50"],
        secondary: [
          "border-purple-200",
          "text-purple-600",
          "hover:bg-purple-50",
        ],
        accent: ["border-pink-200", "text-pink-600", "hover:bg-pink-50"],
        success: [
          "border-emerald-200",
          "text-emerald-600",
          "hover:bg-emerald-50",
        ],
        warning: ["border-amber-200", "text-amber-600", "hover:bg-amber-50"],
        danger: ["border-rose-200", "text-rose-600", "hover:bg-rose-50"],
        info: ["border-cyan-200", "text-cyan-600", "hover:bg-cyan-50"],
        glass: [
          "border-white/30",
          "text-slate-600",
          "dark:text-slate-300",
          "hover:bg-white/20",
        ],
        bordered: ["border-slate-300", "text-slate-600", "hover:bg-slate-100"],
        elevated: ["border-slate-200", "text-slate-600", "hover:bg-slate-100"],
        flat: ["border-slate-200", "text-slate-600", "hover:bg-slate-200"],
        outlined: ["border-slate-300", "text-slate-600", "hover:bg-slate-100"],
        minimal: ["border-slate-200", "text-slate-600", "hover:bg-slate-100"],
        gradient: ["border-white/30", "text-slate-600", "hover:bg-white/20"],
        neon: ["border-cyan-500/50", "text-cyan-400", "hover:bg-cyan-500/20"],
        aurora: [
          "border-emerald-200",
          "text-emerald-600",
          "hover:bg-emerald-50",
        ],
        cosmic: [
          "border-violet-500/30",
          "text-violet-300",
          "hover:bg-violet-500/20",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Footer apply button styles
 */
export const footerApplyButtonVariants = cva(
  [
    "px-4",
    "py-2",
    "text-sm",
    "font-semibold",
    "text-white",
    "rounded-lg",
    "transition-all",
    "duration-200",
    "shadow-lg",
  ],
  {
    variants: {
      variant: {
        default: ["bg-blue-500", "hover:bg-blue-600", "shadow-blue-500/25"],
        primary: ["bg-blue-500", "hover:bg-blue-600", "shadow-blue-500/25"],
        secondary: [
          "bg-purple-500",
          "hover:bg-purple-600",
          "shadow-purple-500/25",
        ],
        accent: ["bg-pink-500", "hover:bg-pink-600", "shadow-pink-500/25"],
        success: [
          "bg-emerald-500",
          "hover:bg-emerald-600",
          "shadow-emerald-500/25",
        ],
        warning: ["bg-amber-500", "hover:bg-amber-600", "shadow-amber-500/25"],
        danger: ["bg-rose-500", "hover:bg-rose-600", "shadow-rose-500/25"],
        info: ["bg-cyan-500", "hover:bg-cyan-600", "shadow-cyan-500/25"],
        glass: [
          "bg-slate-900",
          "dark:bg-white",
          "dark:text-slate-900",
          "hover:bg-slate-800",
          "dark:hover:bg-slate-100",
        ],
        bordered: ["bg-slate-900", "hover:bg-slate-800", "shadow-slate-900/25"],
        elevated: ["bg-blue-500", "hover:bg-blue-600", "shadow-blue-500/25"],
        flat: [
          "bg-slate-900",
          "dark:bg-white",
          "dark:text-slate-900",
          "hover:bg-slate-800",
        ],
        outlined: ["bg-slate-900", "hover:bg-slate-800", "shadow-slate-900/25"],
        minimal: ["bg-blue-500", "hover:bg-blue-600", "shadow-blue-500/25"],
        gradient: [
          "bg-gradient-to-r",
          "from-blue-500",
          "via-purple-500",
          "to-pink-500",
          "hover:from-blue-600",
          "hover:via-purple-600",
          "hover:to-pink-600",
        ],
        neon: ["bg-cyan-500", "hover:bg-cyan-400", "shadow-cyan-500/50"],
        aurora: [
          "bg-gradient-to-r",
          "from-emerald-500",
          "to-cyan-500",
          "hover:from-emerald-600",
          "hover:to-cyan-600",
        ],
        cosmic: [
          "bg-gradient-to-r",
          "from-violet-500",
          "to-fuchsia-500",
          "hover:from-violet-600",
          "hover:to-fuchsia-600",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Arrow/pointer styles
 */
export const arrowVariants = cva(
  ["absolute", "h-4", "w-4", "rotate-45", "border-l", "border-t"],
  {
    variants: {
      variant: {
        default: [
          "bg-white",
          "dark:bg-slate-900",
          "border-slate-200",
          "dark:border-slate-700",
        ],
        primary: ["bg-white", "dark:bg-slate-900", "border-blue-200"],
        secondary: ["bg-white", "dark:bg-slate-900", "border-purple-200"],
        accent: ["bg-white", "dark:bg-slate-900", "border-pink-200"],
        success: ["bg-white", "dark:bg-slate-900", "border-emerald-200"],
        warning: ["bg-white", "dark:bg-slate-900", "border-amber-200"],
        danger: ["bg-white", "dark:bg-slate-900", "border-rose-200"],
        info: ["bg-white", "dark:bg-slate-900", "border-cyan-200"],
        glass: [
          "bg-white/60",
          "dark:bg-slate-900/60",
          "border-white/30",
          "backdrop-blur-xl",
        ],
        bordered: [
          "bg-white",
          "dark:bg-slate-900",
          "border-2",
          "border-slate-300",
        ],
        elevated: ["bg-white", "dark:bg-slate-900", "border-slate-100"],
        flat: ["bg-white", "dark:bg-slate-900", "border-slate-200"],
        outlined: ["bg-white", "dark:bg-slate-900", "border-slate-300"],
        minimal: ["bg-white", "dark:bg-slate-900", "border-slate-200"],
        gradient: [
          "bg-gradient-to-br",
          "from-white/90",
          "to-slate-50/90",
          "border-white/30",
        ],
        neon: ["bg-slate-950", "border-cyan-500/50"],
        aurora: [
          "bg-gradient-to-br",
          "from-emerald-50",
          "to-cyan-50",
          "border-emerald-200/50",
        ],
        cosmic: [
          "bg-gradient-to-br",
          "from-violet-950",
          "to-purple-900",
          "border-violet-500/30",
        ],
      },
      position: {
        above: ["bottom-[.1rem]", "left-6"],
        below: ["top-[0.1rem]", "left-6"],
      },
    },
    defaultVariants: {
      variant: "default",
      position: "below",
    },
  }
);

/**
 * Toggle button styles
 */
export const toggleButtonVariants = cva([
  "absolute",
  "right-0",
  "h-full",
  "px-3",
  "text-base-content/50",
  "hover:text-base-content/70",
  "focus:outline-none",
  "disabled:opacity-40",
  "disabled:cursor-not-allowed",
  "transition-colors",
]);

/**
 * Live clock display styles
 */
export const liveClockVariants = cva([
  "text-center",
  "py-2",
  "border-b",
  "border-slate-100",
  "dark:border-slate-800",
]);

/**
 * Spinner button styles
 */
export const spinnerButtonVariants = cva([
  "flex",
  "items-center",
  "justify-center",
  "w-8",
  "h-8",
  "rounded-lg",
  "text-slate-500",
  "dark:text-slate-400",
  "hover:bg-slate-100",
  "dark:hover:bg-slate-700",
  "hover:text-slate-700",
  "dark:hover:text-slate-200",
  "transition-all",
  "duration-200",
  "disabled:opacity-30",
  "disabled:cursor-not-allowed",
]);

/**
 * Format toggle button styles
 */
export const formatToggleVariants = cva([
  "px-2",
  "py-1",
  "text-xs",
  "font-semibold",
  "rounded-md",
  "transition-all",
  "duration-200",
]);
