/**
 * Modern Design System Utilities
 * Enhanced animations, transitions, and effects for Saha UI
 */

/**
 * Modern transition timing functions
 */
export const transitions = {
  // Smooth easing functions
  smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
  snappy: "cubic-bezier(0.4, 0, 0.6, 1)",
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  elastic: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",

  // Duration presets
  duration: {
    fast: "150ms",
    normal: "250ms",
    slow: "350ms",
    slower: "500ms",
  },
} as const;

/**
 * Modern shadow system
 * Layered shadows for depth and elevation
 */
export const shadows = {
  // Subtle shadows
  xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",

  // Colored glow shadows
  glow: {
    primary: "0 0 20px rgb(var(--primary) / 0.3)",
    secondary: "0 0 20px rgb(var(--secondary) / 0.3)",
    accent: "0 0 20px rgb(var(--accent) / 0.3)",
    success: "0 0 20px rgb(var(--success) / 0.3)",
    warning: "0 0 20px rgb(var(--warning) / 0.3)",
    error: "0 0 20px rgb(var(--destructive) / 0.3)",
  },

  // Inner shadows
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  innerLg: "inset 0 4px 8px 0 rgb(0 0 0 / 0.1)",
} as const;

/**
 * Modern border radius system
 */
export const radius = {
  none: "0",
  sm: "0.375rem", // 6px
  md: "0.5rem", // 8px
  lg: "0.75rem", // 12px
  xl: "1rem", // 16px
  "2xl": "1.25rem", // 20px
  "3xl": "1.5rem", // 24px
  full: "9999px",
} as const;

/**
 * Modern hover and focus states
 */
export const hoverEffects = {
  // Lift effect
  lift: "hover:scale-[1.02] hover:shadow-lg transition-all duration-200",
  liftMore: "hover:scale-105 hover:shadow-xl transition-all duration-200",

  // Glow effect
  glow: "hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-shadow duration-300",
  glowStrong: "hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-shadow duration-300",

  // Brightness
  brighten: "hover:brightness-110 transition-all duration-200",
  dim: "hover:brightness-90 transition-all duration-200",

  // Scale
  scaleUp: "hover:scale-105 transition-transform duration-200",
  scaleDown: "hover:scale-95 transition-transform duration-200",

  // Rotate
  rotate: "hover:rotate-3 transition-transform duration-200",
  rotateBack: "hover:-rotate-3 transition-transform duration-200",

  // Slide
  slideUp: "hover:-translate-y-1 transition-transform duration-200",
  slideDown: "hover:translate-y-1 transition-transform duration-200",
} as const;

/**
 * Modern focus rings
 */
export const focusRings = {
  default:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  primary:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
  thick:
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 focus-visible:ring-offset-2",
  glow: "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:shadow-[0_0_20px_rgba(var(--primary),0.3)]",
} as const;

/**
 * Glassmorphism effects
 */
export const glass = {
  subtle: "backdrop-blur-sm bg-white/5 dark:bg-black/5",
  medium: "backdrop-blur-md bg-white/10 dark:bg-black/10",
  strong: "backdrop-blur-lg bg-white/20 dark:bg-black/20",
  frosted: "backdrop-blur-xl bg-white/30 dark:bg-black/30",
} as const;

/**
 * Modern gradient overlays
 */
export const gradients = {
  shine:
    "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
  shimmer:
    "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/25 after:to-transparent after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-1000",
  depth:
    "after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/20 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300",
  radial:
    "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_50%)] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
} as const;

/**
 * Modern animation keyframes
 */
export const animations = {
  // Fade animations
  fadeIn: "animate-in fade-in duration-200",
  fadeOut: "animate-out fade-out duration-200",

  // Slide animations
  slideInFromTop: "animate-in slide-in-from-top duration-300",
  slideInFromBottom: "animate-in slide-in-from-bottom duration-300",
  slideInFromLeft: "animate-in slide-in-from-left duration-300",
  slideInFromRight: "animate-in slide-in-from-right duration-300",

  // Scale animations
  scaleIn: "animate-in zoom-in duration-200",
  scaleOut: "animate-out zoom-out duration-200",

  // Bounce
  bounce: "animate-bounce",

  // Pulse
  pulse: "animate-pulse",

  // Spin
  spin: "animate-spin",

  // Custom smooth entrance
  smoothEntry: "animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out",
  smoothExit: "animate-out fade-out slide-out-to-bottom-4 duration-300 ease-in",
} as const;

/**
 * Modern spacing system
 */
export const spacing = {
  xs: "0.5rem", // 8px
  sm: "0.75rem", // 12px
  md: "1rem", // 16px
  lg: "1.5rem", // 24px
  xl: "2rem", // 32px
  "2xl": "2.5rem", // 40px
  "3xl": "3rem", // 48px
  "4xl": "4rem", // 64px
} as const;

/**
 * Modern button effect classes
 */
export const buttonEffects = {
  // Ripple effect on click
  ripple: "relative overflow-hidden before:absolute before:inset-0 before:bg-white/20 before:scale-0 active:before:scale-100 before:transition-transform before:duration-300",

  // Press down effect
  press: "active:scale-95 transition-transform duration-100",

  // Magnetic hover (requires JS)
  magnetic: "transition-transform duration-200 ease-out",

  // Float on hover
  float: "hover:-translate-y-1 hover:shadow-lg transition-all duration-200",

  // Glow on hover
  glowHover: "hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] transition-shadow duration-300",
} as const;

/**
 * Modern card effects
 */
export const cardEffects = {
  // Tilt effect (requires JS)
  tilt: "transition-transform duration-200 ease-out",

  // Lift on hover
  lift: "hover:-translate-y-2 hover:shadow-2xl transition-all duration-300",

  // Glow border
  glowBorder:
    "before:absolute before:inset-0 before:rounded-[inherit] before:p-[2px] before:bg-gradient-to-br before:from-primary/50 before:via-transparent before:to-accent/50 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 before:-z-10",

  // Shine effect
  shine:
    "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",

  // Glass morphism
  glass: "backdrop-blur-xl bg-white/5 dark:bg-black/5 border border-white/10",
} as const;

/**
 * Modern input effects
 */
export const inputEffects = {
  // Floating label
  floatingLabel:
    "peer-focus:text-xs peer-focus:-translate-y-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-4 transition-all duration-200",

  // Underline animation
  underline:
    "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary focus:after:w-full after:transition-all after:duration-300",

  // Glow focus
  glowFocus:
    "focus:shadow-[0_0_0_4px_rgba(var(--primary),0.1)] focus:border-primary transition-all duration-200",

  // Scale focus
  scaleFocus: "focus:scale-[1.02] transition-transform duration-200",
} as const;

/**
 * Modern loading states
 */
export const loadingStates = {
  skeleton: "animate-pulse bg-gradient-to-r from-muted/50 via-muted to-muted/50 bg-[length:200%_100%]",
  shimmer:
    "relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:animate-[shimmer_2s_infinite]",
  dots: "animate-bounce",
  spinner: "animate-spin",
} as const;

/**
 * Modern backdrop effects
 */
export const backdrops = {
  blur: "backdrop-blur-md",
  blurStrong: "backdrop-blur-xl",
  saturate: "backdrop-saturate-150",
  brightness: "backdrop-brightness-90",
  combined: "backdrop-blur-md backdrop-saturate-150 backdrop-brightness-90",
} as const;

/**
 * Modern border effects
 */
export const borders = {
  glow: "border-2 border-primary/20 shadow-[0_0_10px_rgba(var(--primary),0.1)]",
  gradient:
    "border-2 border-transparent bg-gradient-to-r from-primary/20 to-accent/20 bg-clip-border",
  animated:
    "border-2 border-primary/20 hover:border-primary/60 transition-colors duration-300",
  shine:
    "border border-border/50 hover:border-primary/30 transition-colors duration-300",
} as const;

/**
 * Modern text effects
 */
export const textEffects = {
  gradient:
    "bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent",
  glow: "text-shadow-[0_0_10px_rgba(var(--primary),0.5)]",
  shimmer:
    "bg-gradient-to-r from-current via-white to-current bg-[length:200%_auto] animate-[shimmer_2s_linear_infinite] bg-clip-text text-transparent",
} as const;

/**
 * Utility function to combine multiple effect classes
 */
export function combineEffects(...effects: string[]): string {
  return effects.filter(Boolean).join(" ");
}

/**
 * Generate transition class
 */
export function transition(
  property: string = "all",
  duration: keyof typeof transitions.duration = "normal",
  timing: keyof Omit<typeof transitions, "duration"> = "smooth"
): string {
  return `transition-${property} duration-${duration} ${transitions[timing]}`;
}

/**
 * Modern z-index system
 */
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  notification: 1080,
} as const;

/**
 * Modern breakpoints
 */
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;
