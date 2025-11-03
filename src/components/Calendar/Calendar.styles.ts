import { cva } from "class-variance-authority";
/**
 * Calendar Container Variants
 */
const calendarVariants = cva(
  [
    "relative w-full max-w-md",
    "transition-all duration-300 ease-out",
    "select-none isolate",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-card/95 shadow-[0_4px_20px_0] shadow-black/5 dark:shadow-black/20",
          "border border-border/30 backdrop-blur-sm",
          "before:absolute before:inset-0 before:bg-gradient-to-br",
          "before:from-primary/5 before:via-transparent before:to-accent/5",
          "before:opacity-50 before:transition-opacity before:duration-500",
        ],
        bordered: [
          "bg-card/90 shadow-sm backdrop-blur-sm",
          "before:absolute before:inset-0 before:bg-gradient-to-br",
          "before:from-primary/3 before:to-accent/3",
          "before:opacity-50 before:transition-opacity before:duration-500",
        ],
        glass: [
          "glass backdrop-blur-2xl",
          "border border-white/10 dark:border-white/5",
          "shadow-[0_8px_32px_0] shadow-black/10 dark:shadow-black/30",
          "before:absolute before:inset-0 before:bg-gradient-to-br",
          "before:from-white/5 before:to-transparent",
          "before:opacity-70 before:transition-opacity before:duration-500",
        ],
        "glass-strong": [
          "glass-strong backdrop-blur-3xl",
          "border-2 border-white/20 dark:border-white/10",
          "shadow-[0_12px_48px_0] shadow-black/15 dark:shadow-black/40",
          "before:absolute before:inset-0 before:bg-gradient-to-br",
          "before:from-white/10 before:to-transparent",
          "before:opacity-80 before:transition-opacity before:duration-500",
        ],
        gradient: [
          "bg-gradient-to-br from-primary/20 via-background to-accent/20",
          "border-2 border-transparent relative",
          "before:absolute before:inset-0 before:-z-10",
          "before:bg-gradient-to-r before:from-primary before:via-accent before:to-secondary",
          "before:opacity-50 before:blur-xl",
          "after:absolute after:inset-[2px] after:bg-background/95 after:rounded-[inherit]",
        ],
      },
      color: {
        primary: "",
        secondary: "",
        accent: "",
        success: "",
        warning: "",
        error: "",
        info: "",
      },
      bordered: {
        true: "border-2",
        false: "",
      },
      size: {
        sm: "p-3 text-sm",
        md: "p-4 text-base",
        lg: "p-6 text-lg",
      },
      rounded: {
        none: "rounded-none before:rounded-none after:rounded-none",
        sm: "rounded-sm before:rounded-sm after:rounded-sm",
        md: "rounded-md before:rounded-md after:rounded-md",
        lg: "rounded-lg before:rounded-lg after:rounded-lg",
        xl: "rounded-xl before:rounded-xl after:rounded-xl",
        "2xl": "rounded-2xl before:rounded-2xl after:rounded-2xl",
      },
    },
    compoundVariants: [
      // Bordered with color variants
      { bordered: true, color: "primary", className: "border-primary/50" },
      { bordered: true, color: "secondary", className: "border-secondary/50" },
      { bordered: true, color: "accent", className: "border-accent/50" },
      { bordered: true, color: "success", className: "border-green-500/50" },
      { bordered: true, color: "warning", className: "border-yellow-500/50" },
      { bordered: true, color: "error", className: "border-red-500/50" },
      { bordered: true, color: "info", className: "border-blue-500/50" },
    ],
    defaultVariants: {
      variant: "default",
      color: "primary",
      bordered: false,
      size: "md",
      rounded: "lg",
    },
  }
);

/**
 * Day cell variants
 */
const dayVariants = cva(
  [
    "relative inline-flex items-center justify-center",
    "font-medium transition-all duration-200",
    "cursor-pointer focus:outline-none focus:z-10",
    "before:absolute before:inset-0 before:rounded-lg",
    "before:transition-all before:duration-200",
  ],
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
      },
      color: {
        primary: "",
        secondary: "",
        accent: "",
        success: "",
        warning: "",
        error: "",
        info: "",
      },
      state: {
        default: ["text-foreground", "before:bg-transparent", "before:scale-0"],
        selected: [
          "font-bold",
          "before:scale-100 before:shadow-lg",
          "hover:before:scale-110",
        ],
        today: ["font-semibold", "ring-2 ring-inset"],
        disabled: [
          "text-muted-foreground/40 cursor-not-allowed",
          "before:bg-transparent hover:before:bg-transparent",
          "before:scale-0",
        ],
        inRange: [
          "font-medium",
          "before:scale-100 before:rounded-none",
          "after:absolute after:inset-y-0 after:-left-px after:-right-px",
          "after:-z-10",
        ],
        rangeStart: [
          "font-bold",
          "before:scale-100 before:shadow-lg",
          "hover:before:scale-105",
          "after:absolute after:inset-y-0 after:left-1/2 after:-right-px",
          "after:-z-10",
        ],
        rangeEnd: [
          "font-bold",
          "before:scale-100 before:shadow-lg",
          "hover:before:scale-105",
          "after:absolute after:inset-y-0 after:-left-px after:right-1/2",
          "after:-z-10",
        ],
        rangeBoth: [
          "font-bold",
          "before:scale-100 before:shadow-lg",
          "hover:before:scale-110",
        ],
        outside: ["text-muted-foreground/30", "hover:text-muted-foreground/50"],
      },
    },
    compoundVariants: [
      // Default state - hover effects for all colors
      {
        state: "default",
        color: "primary",
        className:
          "hover:text-primary hover:before:bg-primary/10 hover:before:scale-100",
      },
      {
        state: "default",
        color: "secondary",
        className:
          "hover:text-secondary hover:before:bg-secondary/10 hover:before:scale-100",
      },
      {
        state: "default",
        color: "accent",
        className:
          "hover:text-accent hover:before:bg-accent/10 hover:before:scale-100",
      },
      {
        state: "default",
        color: "success",
        className:
          "hover:text-green-600 dark:hover:text-green-400 hover:before:bg-green-500/10 hover:before:scale-100",
      },
      {
        state: "default",
        color: "warning",
        className:
          "hover:text-yellow-600 dark:hover:text-yellow-400 hover:before:bg-yellow-500/10 hover:before:scale-100",
      },
      {
        state: "default",
        color: "error",
        className:
          "hover:text-red-600 dark:hover:text-red-400 hover:before:bg-red-500/10 hover:before:scale-100",
      },
      {
        state: "default",
        color: "info",
        className:
          "hover:text-blue-600 dark:hover:text-blue-400 hover:before:bg-blue-500/10 hover:before:scale-100",
      },

      // Selected state colors
      {
        state: "selected",
        color: "primary",
        className:
          "text-primary-foreground before:bg-primary before:shadow-primary/30",
      },
      {
        state: "selected",
        color: "secondary",
        className:
          "text-secondary-foreground before:bg-secondary before:shadow-secondary/30",
      },
      {
        state: "selected",
        color: "accent",
        className:
          "text-accent-foreground before:bg-accent before:shadow-accent/30",
      },
      {
        state: "selected",
        color: "success",
        className: "text-white before:bg-green-500 before:shadow-green-500/30",
      },
      {
        state: "selected",
        color: "warning",
        className:
          "text-white before:bg-yellow-500 before:shadow-yellow-500/30",
      },
      {
        state: "selected",
        color: "error",
        className: "text-white before:bg-red-500 before:shadow-red-500/30",
      },
      {
        state: "selected",
        color: "info",
        className: "text-white before:bg-blue-500 before:shadow-blue-500/30",
      },

      // Today state colors
      {
        state: "today",
        color: "primary",
        className: "text-primary ring-primary/40 hover:ring-primary/60",
      },
      {
        state: "today",
        color: "secondary",
        className: "text-secondary ring-secondary/40 hover:ring-secondary/60",
      },
      {
        state: "today",
        color: "accent",
        className: "text-accent ring-accent/40 hover:ring-accent/60",
      },
      {
        state: "today",
        color: "success",
        className:
          "text-green-600 dark:text-green-400 ring-green-500/40 hover:ring-green-500/60",
      },
      {
        state: "today",
        color: "warning",
        className:
          "text-yellow-600 dark:text-yellow-400 ring-yellow-500/40 hover:ring-yellow-500/60",
      },
      {
        state: "today",
        color: "error",
        className:
          "text-red-600 dark:text-red-400 ring-red-500/40 hover:ring-red-500/60",
      },
      {
        state: "today",
        color: "info",
        className:
          "text-blue-600 dark:text-blue-400 ring-blue-500/40 hover:ring-blue-500/60",
      },

      // InRange state colors
      {
        state: "inRange",
        color: "primary",
        className:
          "text-primary before:bg-primary/20 hover:before:bg-primary/30 after:bg-primary/10",
      },
      {
        state: "inRange",
        color: "secondary",
        className:
          "text-secondary before:bg-secondary/20 hover:before:bg-secondary/30 after:bg-secondary/10",
      },
      {
        state: "inRange",
        color: "accent",
        className:
          "text-accent before:bg-accent/20 hover:before:bg-accent/30 after:bg-accent/10",
      },
      {
        state: "inRange",
        color: "success",
        className:
          "text-green-600 dark:text-green-400 before:bg-green-500/20 hover:before:bg-green-500/30 after:bg-green-500/10",
      },
      {
        state: "inRange",
        color: "warning",
        className:
          "text-yellow-600 dark:text-yellow-400 before:bg-yellow-500/20 hover:before:bg-yellow-500/30 after:bg-yellow-500/10",
      },
      {
        state: "inRange",
        color: "error",
        className:
          "text-red-600 dark:text-red-400 before:bg-red-500/20 hover:before:bg-red-500/30 after:bg-red-500/10",
      },
      {
        state: "inRange",
        color: "info",
        className:
          "text-blue-600 dark:text-blue-400 before:bg-blue-500/20 hover:before:bg-blue-500/30 after:bg-blue-500/10",
      },

      // RangeStart state colors
      {
        state: "rangeStart",
        color: "primary",
        className:
          "text-primary-foreground before:bg-primary before:shadow-primary/30 after:bg-primary/10",
      },
      {
        state: "rangeStart",
        color: "secondary",
        className:
          "text-secondary-foreground before:bg-secondary before:shadow-secondary/30 after:bg-secondary/10",
      },
      {
        state: "rangeStart",
        color: "accent",
        className:
          "text-accent-foreground before:bg-accent before:shadow-accent/30 after:bg-accent/10",
      },
      {
        state: "rangeStart",
        color: "success",
        className:
          "text-white before:bg-green-500 before:shadow-green-500/30 after:bg-green-500/10",
      },
      {
        state: "rangeStart",
        color: "warning",
        className:
          "text-white before:bg-yellow-500 before:shadow-yellow-500/30 after:bg-yellow-500/10",
      },
      {
        state: "rangeStart",
        color: "error",
        className:
          "text-white before:bg-red-500 before:shadow-red-500/30 after:bg-red-500/10",
      },
      {
        state: "rangeStart",
        color: "info",
        className:
          "text-white before:bg-blue-500 before:shadow-blue-500/30 after:bg-blue-500/10",
      },

      // RangeEnd state colors
      {
        state: "rangeEnd",
        color: "primary",
        className:
          "text-primary-foreground before:bg-primary before:shadow-primary/30 after:bg-primary/10",
      },
      {
        state: "rangeEnd",
        color: "secondary",
        className:
          "text-secondary-foreground before:bg-secondary before:shadow-secondary/30 after:bg-secondary/10",
      },
      {
        state: "rangeEnd",
        color: "accent",
        className:
          "text-accent-foreground before:bg-accent before:shadow-accent/30 after:bg-accent/10",
      },
      {
        state: "rangeEnd",
        color: "success",
        className:
          "text-white before:bg-green-500 before:shadow-green-500/30 after:bg-green-500/10",
      },
      {
        state: "rangeEnd",
        color: "warning",
        className:
          "text-white before:bg-yellow-500 before:shadow-yellow-500/30 after:bg-yellow-500/10",
      },
      {
        state: "rangeEnd",
        color: "error",
        className:
          "text-white before:bg-red-500 before:shadow-red-500/30 after:bg-red-500/10",
      },
      {
        state: "rangeEnd",
        color: "info",
        className:
          "text-white before:bg-blue-500 before:shadow-blue-500/30 after:bg-blue-500/10",
      },

      // RangeBoth state colors
      {
        state: "rangeBoth",
        color: "primary",
        className:
          "text-primary-foreground before:bg-primary before:shadow-primary/30",
      },
      {
        state: "rangeBoth",
        color: "secondary",
        className:
          "text-secondary-foreground before:bg-secondary before:shadow-secondary/30",
      },
      {
        state: "rangeBoth",
        color: "accent",
        className:
          "text-accent-foreground before:bg-accent before:shadow-accent/30",
      },
      {
        state: "rangeBoth",
        color: "success",
        className: "text-white before:bg-green-500 before:shadow-green-500/30",
      },
      {
        state: "rangeBoth",
        color: "warning",
        className:
          "text-white before:bg-yellow-500 before:shadow-yellow-500/30",
      },
      {
        state: "rangeBoth",
        color: "error",
        className: "text-white before:bg-red-500 before:shadow-red-500/30",
      },
      {
        state: "rangeBoth",
        color: "info",
        className: "text-white before:bg-blue-500 before:shadow-blue-500/30",
      },
    ],
    defaultVariants: {
      size: "md",
      state: "default",
      color: "primary",
    },
  }
);
export { calendarVariants, dayVariants };