import { cva, type VariantProps } from "class-variance-authority";
import { AlertPosition, AlertAnimation, IconAnimation } from "./Alert.types";

// ============================================
// MAIN ALERT VARIANTS
// ============================================
export const alertVariants = cva(
  [
    "relative w-full flex items-start gap-3 overflow-hidden",
    "transition-all duration-300 ease-out",
  ],
  {
    variants: {
      variant: {
        solid: ["text-white", "shadow-lg"],
        subtle: ["border", "shadow-sm"],
        outline: ["border-2", "bg-transparent"],
        "left-accent": ["border-l-4", "shadow-sm"],
        "top-accent": ["border-t-4", "shadow-sm"],
        glass: [
          "border",
          "backdrop-blur-xl",
          "backdrop-saturate-150",
          "shadow-lg",
        ],
        gradient: [
          "text-white",
          "shadow-lg",
          "bg-[length:200%_auto]",
          "animate-[gradient-x_3s_ease_infinite]",
        ],
        minimal: ["bg-transparent", "shadow-none"],
      },
      status: {
        info: "",
        success: "",
        warning: "",
        danger: "",
        neutral: "",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-md",
        md: "rounded-lg",
        lg: "rounded-xl",
        xl: "rounded-2xl",
        full: "rounded-3xl",
      },
      shadow: {
        none: "shadow-none",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl",
      },
      size: {
        sm: "p-3 text-sm gap-2",
        md: "p-4 gap-3",
        lg: "p-5 text-lg gap-4",
      },
    },
    compoundVariants: [
      // ==================== SOLID ====================
      {
        variant: "solid",
        status: "info",
        className: ["bg-blue-600", "shadow-blue-500/30"],
      },
      {
        variant: "solid",
        status: "success",
        className: ["bg-emerald-600", "shadow-emerald-500/30"],
      },
      {
        variant: "solid",
        status: "warning",
        className: ["bg-amber-500", "text-amber-950", "shadow-amber-500/30"],
      },
      {
        variant: "solid",
        status: "danger",
        className: ["bg-red-600", "shadow-red-500/30"],
      },
      {
        variant: "solid",
        status: "neutral",
        className: ["bg-gray-700", "shadow-gray-500/30"],
      },

      // ==================== SUBTLE ====================
      {
        variant: "subtle",
        status: "info",
        className: [
          "bg-blue-50 border-blue-200 text-blue-900",
          "dark:bg-blue-950/50 dark:border-blue-800 dark:text-blue-100",
        ],
      },
      {
        variant: "subtle",
        status: "success",
        className: [
          "bg-emerald-50 border-emerald-200 text-emerald-900",
          "dark:bg-emerald-950/50 dark:border-emerald-800 dark:text-emerald-100",
        ],
      },
      {
        variant: "subtle",
        status: "warning",
        className: [
          "bg-amber-50 border-amber-200 text-amber-900",
          "dark:bg-amber-950/50 dark:border-amber-800 dark:text-amber-100",
        ],
      },
      {
        variant: "subtle",
        status: "danger",
        className: [
          "bg-red-50 border-red-200 text-red-900",
          "dark:bg-red-950/50 dark:border-red-800 dark:text-red-100",
        ],
      },
      {
        variant: "subtle",
        status: "neutral",
        className: [
          "bg-gray-50 border-gray-200 text-gray-900",
          "dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-100",
        ],
      },

      // ==================== OUTLINE ====================
      {
        variant: "outline",
        status: "info",
        className: ["border-blue-500 text-blue-700 dark:text-blue-400"],
      },
      {
        variant: "outline",
        status: "success",
        className: [
          "border-emerald-500 text-emerald-700 dark:text-emerald-400",
        ],
      },
      {
        variant: "outline",
        status: "warning",
        className: ["border-amber-500 text-amber-700 dark:text-amber-400"],
      },
      {
        variant: "outline",
        status: "danger",
        className: ["border-red-500 text-red-700 dark:text-red-400"],
      },
      {
        variant: "outline",
        status: "neutral",
        className: [
          "border-gray-400 text-gray-700 dark:border-gray-500 dark:text-gray-300",
        ],
      },

      // ==================== LEFT ACCENT ====================
      {
        variant: "left-accent",
        status: "info",
        className: [
          "border-l-blue-500 bg-blue-50/80 text-blue-900",
          "dark:bg-blue-950/40 dark:text-blue-100",
        ],
      },
      {
        variant: "left-accent",
        status: "success",
        className: [
          "border-l-emerald-500 bg-emerald-50/80 text-emerald-900",
          "dark:bg-emerald-950/40 dark:text-emerald-100",
        ],
      },
      {
        variant: "left-accent",
        status: "warning",
        className: [
          "border-l-amber-500 bg-amber-50/80 text-amber-900",
          "dark:bg-amber-950/40 dark:text-amber-100",
        ],
      },
      {
        variant: "left-accent",
        status: "danger",
        className: [
          "border-l-red-500 bg-red-50/80 text-red-900",
          "dark:bg-red-950/40 dark:text-red-100",
        ],
      },
      {
        variant: "left-accent",
        status: "neutral",
        className: [
          "border-l-gray-500 bg-gray-50/80 text-gray-900",
          "dark:bg-gray-800/40 dark:text-gray-100",
        ],
      },

      // ==================== TOP ACCENT ====================
      {
        variant: "top-accent",
        status: "info",
        className: [
          "border-t-blue-500 bg-blue-50/80 text-blue-900",
          "dark:bg-blue-950/40 dark:text-blue-100",
        ],
      },
      {
        variant: "top-accent",
        status: "success",
        className: [
          "border-t-emerald-500 bg-emerald-50/80 text-emerald-900",
          "dark:bg-emerald-950/40 dark:text-emerald-100",
        ],
      },
      {
        variant: "top-accent",
        status: "warning",
        className: [
          "border-t-amber-500 bg-amber-50/80 text-amber-900",
          "dark:bg-amber-950/40 dark:text-amber-100",
        ],
      },
      {
        variant: "top-accent",
        status: "danger",
        className: [
          "border-t-red-500 bg-red-50/80 text-red-900",
          "dark:bg-red-950/40 dark:text-red-100",
        ],
      },
      {
        variant: "top-accent",
        status: "neutral",
        className: [
          "border-t-gray-500 bg-gray-50/80 text-gray-900",
          "dark:bg-gray-800/40 dark:text-gray-100",
        ],
      },

      // ==================== GLASS ====================
      {
        variant: "glass",
        status: "info",
        className: [
          "bg-blue-500/10 border-blue-400/30 text-blue-900 shadow-blue-500/10",
          "dark:bg-blue-400/10 dark:border-blue-400/20 dark:text-blue-100",
        ],
      },
      {
        variant: "glass",
        status: "success",
        className: [
          "bg-emerald-500/10 border-emerald-400/30 text-emerald-900 shadow-emerald-500/10",
          "dark:bg-emerald-400/10 dark:border-emerald-400/20 dark:text-emerald-100",
        ],
      },
      {
        variant: "glass",
        status: "warning",
        className: [
          "bg-amber-500/10 border-amber-400/30 text-amber-900 shadow-amber-500/10",
          "dark:bg-amber-400/10 dark:border-amber-400/20 dark:text-amber-100",
        ],
      },
      {
        variant: "glass",
        status: "danger",
        className: [
          "bg-red-500/10 border-red-400/30 text-red-900 shadow-red-500/10",
          "dark:bg-red-400/10 dark:border-red-400/20 dark:text-red-100",
        ],
      },
      {
        variant: "glass",
        status: "neutral",
        className: [
          "bg-gray-500/10 border-gray-400/30 text-gray-900 shadow-gray-500/10",
          "dark:bg-gray-400/10 dark:border-gray-400/20 dark:text-gray-100",
        ],
      },

      // ==================== GRADIENT ====================
      {
        variant: "gradient",
        status: "info",
        className: [
          "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600",
          "shadow-blue-500/25",
        ],
      },
      {
        variant: "gradient",
        status: "success",
        className: [
          "bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600",
          "shadow-emerald-500/25",
        ],
      },
      {
        variant: "gradient",
        status: "warning",
        className: [
          "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500",
          "text-amber-950 shadow-amber-500/25",
        ],
      },
      {
        variant: "gradient",
        status: "danger",
        className: [
          "bg-gradient-to-r from-red-600 via-rose-500 to-red-600",
          "shadow-red-500/25",
        ],
      },
      {
        variant: "gradient",
        status: "neutral",
        className: [
          "bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700",
          "shadow-gray-500/25",
        ],
      },

      // ==================== MINIMAL ====================
      {
        variant: "minimal",
        status: "info",
        className: "text-blue-700 dark:text-blue-400",
      },
      {
        variant: "minimal",
        status: "success",
        className: "text-emerald-700 dark:text-emerald-400",
      },
      {
        variant: "minimal",
        status: "warning",
        className: "text-amber-700 dark:text-amber-400",
      },
      {
        variant: "minimal",
        status: "danger",
        className: "text-red-700 dark:text-red-400",
      },
      {
        variant: "minimal",
        status: "neutral",
        className: "text-gray-700 dark:text-gray-400",
      },
    ],
    defaultVariants: {
      variant: "subtle",
      status: "info",
      rounded: "lg",
      shadow: "sm",
      size: "md",
    },
  }
);

// Type export
export type AlertVariantsProps = VariantProps<typeof alertVariants>;

// ============================================
// PROGRESS BAR
// ============================================
export const progressTrackClass =
  "absolute bottom-0 left-0 right-0 h-1 overflow-hidden rounded-b-[inherit]";
export const progressBarClass = "h-full";

export const progressTrackColors: Record<string, string> = {
  info: "bg-blue-200/50 dark:bg-blue-800/30",
  success: "bg-emerald-200/50 dark:bg-emerald-800/30",
  warning: "bg-amber-200/50 dark:bg-amber-800/30",
  danger: "bg-red-200/50 dark:bg-red-800/30",
  neutral: "bg-gray-200/50 dark:bg-gray-700/30",
};

export const progressBarColors: Record<string, string> = {
  info: "bg-blue-500",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  neutral: "bg-gray-500",
};

// ============================================
// POSITIONS
// ============================================
export const positionClasses: Record<AlertPosition, string> = {
  "top-left": "top-4 left-4 items-start",
  "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
  "top-right": "top-4 right-4 items-end",
  "middle-left": "top-1/2 left-4 -translate-y-1/2 items-start",
  "middle-center":
    "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center",
  "middle-right": "top-1/2 right-4 -translate-y-1/2 items-end",
  "bottom-left": "bottom-4 left-4 items-start",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
  "bottom-right": "bottom-4 right-4 items-end",
};

// ============================================
// ANIMATIONS
// ============================================
const EASING = "ease-[cubic-bezier(0.25,0.1,0.25,1)]";
const EASING_OUT = "ease-[cubic-bezier(0.22,1,0.36,1)]";
const DURATION_IN = "duration-400";
const DURATION_OUT = "duration-300";

export const getAnimationClasses = (
  animation: AlertAnimation,
  state: "initial" | "enter" | "exit"
): string => {
  const base = `transition-all ${EASING_OUT}`;

  const animations: Record<
    AlertAnimation,
    Record<"initial" | "enter" | "exit", string>
  > = {
    fade: {
      initial: `${base} ${DURATION_IN} opacity-0`,
      enter: `${base} ${DURATION_IN} opacity-100`,
      exit: `${base} ${DURATION_OUT} opacity-0`,
    },
    "slide-up": {
      initial: `${base} ${DURATION_IN} opacity-0 translate-y-4`,
      enter: `${base} ${DURATION_IN} opacity-100 translate-y-0`,
      exit: `${base} ${DURATION_OUT} opacity-0 -translate-y-4`,
    },
    "slide-down": {
      initial: `${base} ${DURATION_IN} opacity-0 -translate-y-4`,
      enter: `${base} ${DURATION_IN} opacity-100 translate-y-0`,
      exit: `${base} ${DURATION_OUT} opacity-0 translate-y-4`,
    },
    "slide-left": {
      initial: `${base} ${DURATION_IN} opacity-0 translate-x-6`,
      enter: `${base} ${DURATION_IN} opacity-100 translate-x-0`,
      exit: `${base} ${DURATION_OUT} opacity-0 translate-x-6`,
    },
    "slide-right": {
      initial: `${base} ${DURATION_IN} opacity-0 -translate-x-6`,
      enter: `${base} ${DURATION_IN} opacity-100 translate-x-0`,
      exit: `${base} ${DURATION_OUT} opacity-0 -translate-x-6`,
    },
    scale: {
      initial: `${base} ${DURATION_IN} opacity-0 scale-95`,
      enter: `${base} ${DURATION_IN} opacity-100 scale-100`,
      exit: `${base} ${DURATION_OUT} opacity-0 scale-95`,
    },
    bounce: {
      initial: `transition-all ease-[cubic-bezier(0.34,1.56,0.64,1)] ${DURATION_IN} opacity-0 scale-90`,
      enter: `transition-all ease-[cubic-bezier(0.34,1.56,0.64,1)] ${DURATION_IN} opacity-100 scale-100`,
      exit: `${base} ${DURATION_OUT} opacity-0 scale-95`,
    },
    none: {
      initial: "",
      enter: "",
      exit: "hidden",
    },
  };

  return animations[animation][state];
};

// ============================================
// ICON ANIMATIONS
// ============================================
export const iconAnimationClasses: Record<IconAnimation, string> = {
  none: "",
  pulse: "animate-[pulse_2.5s_ease-in-out_infinite]",
  spin: "animate-[spin_1.5s_linear_infinite]",
  bounce: "animate-[bounce_1.5s_ease-in-out_infinite]",
  shake: "animate-[shake_0.6s_ease-in-out_infinite]",
};

export const getIconAnimationClass = (animation: IconAnimation): string => {
  return iconAnimationClasses[animation] || "";
};

// ============================================
// BUTTON STYLES
// ============================================
export const closeButtonClass = [
  "shrink-0 p-1.5 -m-1 rounded-lg",
  "transition-all duration-200 ease-out",
  "hover:bg-black/10 dark:hover:bg-white/10",
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  "active:scale-95",
].join(" ");

export const actionButtonClasses = {
  link: [
    "text-sm font-medium",
    "underline-offset-2 hover:underline",
    "transition-all duration-200",
  ].join(" "),
  button: [
    "text-sm font-medium px-3 py-1.5 rounded-md",
    "bg-black/10 hover:bg-black/15",
    "dark:bg-white/10 dark:hover:bg-white/15",
    "transition-all duration-200",
  ].join(" "),
};

export const secondaryActionClass = [
  "text-sm opacity-70 hover:opacity-100",
  "transition-opacity duration-200",
].join(" ");

// ============================================
// CONTAINER STYLES
// ============================================
export const toastContainerClass = [
  "fixed z-[9999]",
  "flex flex-col gap-3",
  "w-full max-w-sm",
  "pointer-events-none p-4",
].join(" ");

export const toastItemClass = "pointer-events-auto w-full";
