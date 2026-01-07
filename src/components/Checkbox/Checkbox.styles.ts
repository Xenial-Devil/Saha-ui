import { cva } from "class-variance-authority";
import type {
  CheckboxColorScheme,
  CheckboxShape,
  CheckboxFillStyle,
  CheckboxAnimation,
} from "./Checkbox.types";

/**
 * Color scheme configuration
 */
export interface ColorSchemeConfig {
  bg: string;
  border: string;
  checked: string;
  ring: string;
  gradient?: string;
  glow?: string;
}

/**
 * Predefined color schemes
 */
export const colorSchemes: Record<CheckboxColorScheme, ColorSchemeConfig> = {
  default: {
    bg: "bg-background",
    border: "border-border",
    checked: "bg-foreground",
    ring: "ring-foreground/20",
  },
  primary: {
    bg: "bg-primary/5",
    border: "border-primary/30",
    checked: "bg-primary",
    ring: "ring-primary/20",
  },
  secondary: {
    bg: "bg-secondary/5",
    border: "border-secondary/30",
    checked: "bg-secondary",
    ring: "ring-secondary/20",
  },
  accent: {
    bg: "bg-accent/5",
    border: "border-accent/30",
    checked: "bg-accent",
    ring: "ring-accent/20",
  },
  success: {
    bg: "bg-emerald-50 dark:bg-emerald-950/20",
    border: "border-emerald-300 dark:border-emerald-700",
    checked: "bg-emerald-500",
    ring: "ring-emerald-500/20",
    glow: "shadow-emerald-500/50",
  },
  warning: {
    bg: "bg-amber-50 dark:bg-amber-950/20",
    border: "border-amber-300 dark:border-amber-700",
    checked: "bg-amber-500",
    ring: "ring-amber-500/20",
    glow: "shadow-amber-500/50",
  },
  error: {
    bg: "bg-red-50 dark:bg-red-950/20",
    border: "border-red-300 dark:border-red-700",
    checked: "bg-red-500",
    ring: "ring-red-500/20",
    glow: "shadow-red-500/50",
  },
  info: {
    bg: "bg-blue-50 dark:bg-blue-950/20",
    border: "border-blue-300 dark:border-blue-700",
    checked: "bg-blue-500",
    ring: "ring-blue-500/20",
    glow: "shadow-blue-500/50",
  },
  // Extended colors
  red: {
    bg: "bg-red-50 dark:bg-red-950/20",
    border: "border-red-300 dark:border-red-700",
    checked: "bg-red-500",
    ring: "ring-red-500/20",
    glow: "shadow-red-500/50",
  },
  orange: {
    bg: "bg-orange-50 dark:bg-orange-950/20",
    border: "border-orange-300 dark:border-orange-700",
    checked: "bg-orange-500",
    ring: "ring-orange-500/20",
    glow: "shadow-orange-500/50",
  },
  amber: {
    bg: "bg-amber-50 dark:bg-amber-950/20",
    border: "border-amber-300 dark:border-amber-700",
    checked: "bg-amber-500",
    ring: "ring-amber-500/20",
    glow: "shadow-amber-500/50",
  },
  yellow: {
    bg: "bg-yellow-50 dark:bg-yellow-950/20",
    border: "border-yellow-300 dark:border-yellow-700",
    checked: "bg-yellow-500",
    ring: "ring-yellow-500/20",
    glow: "shadow-yellow-500/50",
  },
  lime: {
    bg: "bg-lime-50 dark:bg-lime-950/20",
    border: "border-lime-300 dark:border-lime-700",
    checked: "bg-lime-500",
    ring: "ring-lime-500/20",
    glow: "shadow-lime-500/50",
  },
  green: {
    bg: "bg-green-50 dark:bg-green-950/20",
    border: "border-green-300 dark:border-green-700",
    checked: "bg-green-500",
    ring: "ring-green-500/20",
    glow: "shadow-green-500/50",
  },
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-950/20",
    border: "border-emerald-300 dark:border-emerald-700",
    checked: "bg-emerald-500",
    ring: "ring-emerald-500/20",
    glow: "shadow-emerald-500/50",
  },
  teal: {
    bg: "bg-teal-50 dark:bg-teal-950/20",
    border: "border-teal-300 dark:border-teal-700",
    checked: "bg-teal-500",
    ring: "ring-teal-500/20",
    glow: "shadow-teal-500/50",
  },
  cyan: {
    bg: "bg-cyan-50 dark:bg-cyan-950/20",
    border: "border-cyan-300 dark:border-cyan-700",
    checked: "bg-cyan-500",
    ring: "ring-cyan-500/20",
    glow: "shadow-cyan-500/50",
  },
  sky: {
    bg: "bg-sky-50 dark:bg-sky-950/20",
    border: "border-sky-300 dark:border-sky-700",
    checked: "bg-sky-500",
    ring: "ring-sky-500/20",
    glow: "shadow-sky-500/50",
  },
  blue: {
    bg: "bg-blue-50 dark:bg-blue-950/20",
    border: "border-blue-300 dark:border-blue-700",
    checked: "bg-blue-500",
    ring: "ring-blue-500/20",
    glow: "shadow-blue-500/50",
  },
  indigo: {
    bg: "bg-indigo-50 dark:bg-indigo-950/20",
    border: "border-indigo-300 dark:border-indigo-700",
    checked: "bg-indigo-500",
    ring: "ring-indigo-500/20",
    glow: "shadow-indigo-500/50",
  },
  violet: {
    bg: "bg-violet-50 dark:bg-violet-950/20",
    border: "border-violet-300 dark:border-violet-700",
    checked: "bg-violet-500",
    ring: "ring-violet-500/20",
    glow: "shadow-violet-500/50",
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-950/20",
    border: "border-purple-300 dark:border-purple-700",
    checked: "bg-purple-500",
    ring: "ring-purple-500/20",
    glow: "shadow-purple-500/50",
  },
  fuchsia: {
    bg: "bg-fuchsia-50 dark:bg-fuchsia-950/20",
    border: "border-fuchsia-300 dark:border-fuchsia-700",
    checked: "bg-fuchsia-500",
    ring: "ring-fuchsia-500/20",
    glow: "shadow-fuchsia-500/50",
  },
  pink: {
    bg: "bg-pink-50 dark:bg-pink-950/20",
    border: "border-pink-300 dark:border-pink-700",
    checked: "bg-pink-500",
    ring: "ring-pink-500/20",
    glow: "shadow-pink-500/50",
  },
  rose: {
    bg: "bg-rose-50 dark:bg-rose-950/20",
    border: "border-rose-300 dark:border-rose-700",
    checked: "bg-rose-500",
    ring: "ring-rose-500/20",
    glow: "shadow-rose-500/50",
  },
  slate: {
    bg: "bg-slate-50 dark:bg-slate-950/20",
    border: "border-slate-300 dark:border-slate-700",
    checked: "bg-slate-500",
    ring: "ring-slate-500/20",
    glow: "shadow-slate-500/50",
  },
  gray: {
    bg: "bg-gray-50 dark:bg-gray-950/20",
    border: "border-gray-300 dark:border-gray-700",
    checked: "bg-gray-500",
    ring: "ring-gray-500/20",
    glow: "shadow-gray-500/50",
  },
  zinc: {
    bg: "bg-zinc-50 dark:bg-zinc-950/20",
    border: "border-zinc-300 dark:border-zinc-700",
    checked: "bg-zinc-500",
    ring: "ring-zinc-500/20",
    glow: "shadow-zinc-500/50",
  },
  neutral: {
    bg: "bg-neutral-50 dark:bg-neutral-950/20",
    border: "border-neutral-300 dark:border-neutral-700",
    checked: "bg-neutral-500",
    ring: "ring-neutral-500/20",
    glow: "shadow-neutral-500/50",
  },
  stone: {
    bg: "bg-stone-50 dark:bg-stone-950/20",
    border: "border-stone-300 dark:border-stone-700",
    checked: "bg-stone-500",
    ring: "ring-stone-500/20",
    glow: "shadow-stone-500/50",
  },
  // Gradient color schemes
  gradientSunset: {
    bg: "bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-950/20 dark:to-pink-950/20",
    border: "border-orange-300 dark:border-orange-700",
    checked: "bg-gradient-to-r from-orange-500 to-pink-500",
    ring: "ring-orange-500/20",
    gradient: "linear-gradient(to right, #f97316, #ec4899)",
    glow: "shadow-orange-500/50",
  },
  gradientOcean: {
    bg: "bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-950/20 dark:to-blue-950/20",
    border: "border-cyan-300 dark:border-cyan-700",
    checked: "bg-gradient-to-r from-cyan-500 to-blue-500",
    ring: "ring-cyan-500/20",
    gradient: "linear-gradient(to right, #06b6d4, #3b82f6)",
    glow: "shadow-cyan-500/50",
  },
  gradientForest: {
    bg: "bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-950/20 dark:to-emerald-950/20",
    border: "border-green-300 dark:border-green-700",
    checked: "bg-gradient-to-r from-green-500 to-emerald-500",
    ring: "ring-green-500/20",
    gradient: "linear-gradient(to right, #22c55e, #10b981)",
    glow: "shadow-green-500/50",
  },
  gradientFire: {
    bg: "bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-950/20 dark:to-orange-950/20",
    border: "border-red-300 dark:border-red-700",
    checked: "bg-gradient-to-r from-red-500 to-orange-500",
    ring: "ring-red-500/20",
    gradient: "linear-gradient(to right, #ef4444, #f97316)",
    glow: "shadow-red-500/50",
  },
  gradientNight: {
    bg: "bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-950/20 dark:to-purple-950/20",
    border: "border-indigo-300 dark:border-indigo-700",
    checked: "bg-gradient-to-r from-indigo-500 to-purple-500",
    ring: "ring-indigo-500/20",
    gradient: "linear-gradient(to right, #6366f1, #a855f7)",
    glow: "shadow-indigo-500/50",
  },
  gradientRainbow: {
    bg: "bg-gradient-to-r from-red-100 via-yellow-100 to-blue-100 dark:from-red-950/20 dark:via-yellow-950/20 dark:to-blue-950/20",
    border: "border-violet-300 dark:border-violet-700",
    checked: "bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500",
    ring: "ring-violet-500/20",
    gradient: "linear-gradient(to right, #ef4444, #eab308, #3b82f6)",
    glow: "shadow-violet-500/50",
  },
  gradientNeon: {
    bg: "bg-gradient-to-r from-fuchsia-100 to-cyan-100 dark:from-fuchsia-950/20 dark:to-cyan-950/20",
    border: "border-fuchsia-300 dark:border-fuchsia-700",
    checked: "bg-gradient-to-r from-fuchsia-500 to-cyan-500",
    ring: "ring-fuchsia-500/20",
    gradient: "linear-gradient(to right, #d946ef, #06b6d4)",
    glow: "shadow-fuchsia-500/50",
  },
  gradientPastel: {
    bg: "bg-gradient-to-r from-pink-100 to-sky-100 dark:from-pink-950/20 dark:to-sky-950/20",
    border: "border-pink-300 dark:border-pink-700",
    checked: "bg-gradient-to-r from-pink-400 to-sky-400",
    ring: "ring-pink-500/20",
    gradient: "linear-gradient(to right, #f472b6, #38bdf8)",
    glow: "shadow-pink-400/50",
  },
  gradientMetallic: {
    bg: "bg-gradient-to-r from-slate-200 to-zinc-200 dark:from-slate-800/50 dark:to-zinc-800/50",
    border: "border-slate-400 dark:border-slate-600",
    checked: "bg-gradient-to-r from-slate-500 to-zinc-400",
    ring: "ring-slate-500/20",
    gradient: "linear-gradient(to right, #64748b, #a1a1aa)",
    glow: "shadow-slate-500/50",
  },
  gradientAurora: {
    bg: "bg-gradient-to-r from-green-100 via-purple-100 to-pink-100 dark:from-green-950/20 dark:via-purple-950/20 dark:to-pink-950/20",
    border: "border-green-300 dark:border-green-700",
    checked: "bg-gradient-to-r from-green-400 via-purple-500 to-pink-500",
    ring: "ring-purple-500/20",
    gradient: "linear-gradient(to right, #4ade80, #a855f7, #ec4899)",
    glow: "shadow-purple-500/50",
  },
};

/**
 * Get color scheme by name
 */
export const getColorScheme = (
  scheme: CheckboxColorScheme | undefined
): ColorSchemeConfig => {
  return colorSchemes[scheme || "primary"] || colorSchemes.primary;
};

/**
 * Shape classes
 */
export const shapeClasses: Record<CheckboxShape, string> = {
  square: "rounded-none",
  rounded: "rounded-md",
  circle: "rounded-full",
  pill: "rounded-full",
  roundedSm: "rounded-sm",
  roundedLg: "rounded-lg",
  roundedXl: "rounded-xl",
  diamond: "rotate-45 rounded-sm",
  hexagon: "clip-path-hexagon",
  octagon: "clip-path-octagon",
  shield: "clip-path-shield rounded-t-full",
  leaf: "rounded-tl-full rounded-br-full",
  blob: "rounded-[40%_60%_60%_40%/60%_30%_70%_40%]",
  squircle: "rounded-[30%]",
};

/**
 * Size classes for checkbox box
 */
export const sizeClasses = {
  xs: { box: "w-3 h-3", icon: "w-2 h-2" },
  sm: { box: "w-4 h-4", icon: "w-2.5 h-2.5" },
  md: { box: "w-5 h-5", icon: "w-3 h-3" },
  lg: { box: "w-6 h-6", icon: "w-3.5 h-3.5" },
  xl: { box: "w-7 h-7", icon: "w-4 h-4" },
  "2xl": { box: "w-8 h-8", icon: "w-5 h-5" },
  "3xl": { box: "w-10 h-10", icon: "w-6 h-6" },
  "4xl": { box: "w-12 h-12", icon: "w-7 h-7" },
};

/**
 * Animation classes
 */
export const animationClasses: Record<CheckboxAnimation, string> = {
  none: "",
  scale: "transition-transform duration-200 ease-out",
  bounce: "transition-transform duration-300 ease-bounce",
  slide: "transition-transform duration-200 ease-out",
  fade: "transition-opacity duration-200 ease-out",
  spin: "transition-transform duration-300 ease-out",
  pulse: "animate-pulse",
  shake: "animate-shake",
  flip: "transition-transform duration-300 [transform-style:preserve-3d]",
  jelly: "transition-transform duration-300 ease-elastic",
  rubberBand: "animate-rubberBand",
  swing: "animate-swing origin-top",
  tada: "animate-tada",
  heartbeat: "animate-heartbeat",
};

/**
 * Fill style classes
 */
export const fillStyleClasses: Record<
  CheckboxFillStyle,
  {
    checked: string;
    unchecked: string;
  }
> = {
  filled: {
    checked: "",
    unchecked: "",
  },
  outline: {
    checked: "bg-transparent border-2",
    unchecked: "",
  },
  soft: {
    checked: "bg-opacity-20",
    unchecked: "bg-opacity-10",
  },
  ghost: {
    checked: "bg-transparent border-transparent",
    unchecked: "bg-transparent border-transparent hover:bg-muted/50",
  },
  gradient: {
    checked: "",
    unchecked: "",
  },
  striped: {
    checked:
      "bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(255,255,255,0.2)_2px,rgba(255,255,255,0.2)_4px)]",
    unchecked: "",
  },
  glass: {
    checked: "bg-white/20 backdrop-blur-sm border-white/30",
    unchecked: "bg-white/10 backdrop-blur-sm border-white/20",
  },
  neon: {
    checked: "",
    unchecked: "",
  },
  glow: {
    checked: "shadow-lg",
    unchecked: "",
  },
  shadow: {
    checked: "shadow-md shadow-black/20",
    unchecked: "shadow-sm shadow-black/10",
  },
  dotted: {
    checked: "border-dotted border-2",
    unchecked: "border-dotted border-2",
  },
  dashed: {
    checked: "border-dashed border-2",
    unchecked: "border-dashed border-2",
  },
  double: {
    checked: "border-double border-4",
    unchecked: "border-double border-4",
  },
  "3d": {
    checked:
      "shadow-[inset_0_-2px_4px_rgba(0,0,0,0.2),0_2px_4px_rgba(0,0,0,0.1)] translate-y-0.5",
    unchecked:
      "shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),0_2px_4px_rgba(0,0,0,0.1)]",
  },
  inset: {
    checked: "shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]",
    unchecked: "shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]",
  },
  raised: {
    checked: "shadow-lg -translate-y-0.5",
    unchecked: "shadow-md",
  },
};

/**
 * Glow intensity classes
 */
export const glowIntensityClasses = {
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
};

/**
 * Shadow intensity classes
 */
export const shadowIntensityClasses = {
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl shadow-2xl",
};

/**
 * Checkbox variants (for backward compatibility)
 */
const checkboxVariants = cva(
  [
    "peer relative appearance-none shrink-0 border-2",
    "transition-all duration-200 ease-out cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: "",
        primary: "",
        secondary: "",
        accent: "",
        success: "",
        warning: "",
        error: "",
        glass: [
          "border-white/20 bg-white/10 backdrop-blur-xl",
          "dark:bg-black/10",
        ],
        neon: "shadow-[0_0_10px_currentColor]",
        gradient: "",
        minimal: "border",
        bold: "border-3",
      },
      size: {
        xs: "h-3 w-3",
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
        xl: "h-7 w-7",
        "2xl": "h-8 w-8",
        "3xl": "h-10 w-10",
        "4xl": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

/**
 * Checkbox label wrapper variants
 */
const checkboxLabelVariants = cva(
  [
    "inline-flex cursor-pointer select-none",
    "transition-all duration-200",
    "group",
  ],
  {
    variants: {
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "",
      },
      labelPosition: {
        left: "flex-row-reverse items-center gap-3",
        right: "flex-row items-center gap-3",
        top: "flex-col-reverse items-start gap-2",
        bottom: "flex-col items-start gap-2",
      },
    },
    defaultVariants: {
      disabled: false,
      labelPosition: "right",
    },
  }
);

/**
 * Checkbox text variants
 */
const checkboxTextVariants = cva(
  ["font-medium transition-colors duration-200", "group-hover:text-foreground"],
  {
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-sm",
        lg: "text-base",
        xl: "text-base",
        "2xl": "text-lg",
        "3xl": "text-xl",
        "4xl": "text-2xl",
      },
      disabled: {
        true: "text-muted-foreground",
        false: "text-foreground",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
    },
  }
);

/**
 * Checkbox description variants
 */
const checkboxDescriptionVariants = cva(
  ["text-muted-foreground transition-colors duration-200"],
  {
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-xs",
        md: "text-sm",
        lg: "text-sm",
        xl: "text-base",
        "2xl": "text-base",
        "3xl": "text-lg",
        "4xl": "text-xl",
      },
      disabled: {
        true: "opacity-70",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
    },
  }
);

/**
 * Gap classes for checkbox group
 */
export const gapClasses = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-3",
  lg: "gap-4",
  xl: "gap-6",
};

/**
 * Column classes for grid layout
 */
export const columnClasses = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

export {
  checkboxVariants,
  checkboxLabelVariants,
  checkboxTextVariants,
  checkboxDescriptionVariants,
};
