import { cva } from "class-variance-authority";

/**
 * DatePicker input variant styles
 */
export const datePickerVariants = cva(
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
 * Calendar dropdown container styles
 */
export const calendarVariants = cva(
  ["shadow-lg", "border", "rounded-lg", "overflow-hidden"],
  {
    variants: {
      variant: {
        default: ["bg-white", "dark:bg-gray-800", "border-base-300", "text-base-content"],
        primary: ["bg-white", "dark:bg-gray-800", "border-primary/20", "text-base-content"],
        secondary: ["bg-white", "dark:bg-gray-800", "border-secondary/20", "text-base-content"],
        accent: ["bg-white", "dark:bg-gray-800", "border-accent/20", "text-base-content"],
        success: ["bg-white", "dark:bg-gray-800", "border-success/20", "text-base-content"],
        warning: ["bg-white", "dark:bg-gray-800", "border-warning/20", "text-base-content"],
        danger: ["bg-white", "dark:bg-gray-800", "border-destructive/20", "text-base-content"],
        info: ["bg-white", "dark:bg-gray-800", "border-info/20", "text-base-content"],
        glass: [
          "backdrop-blur-xl",
          "bg-white/30",
          "dark:bg-gray-900/40",
          "border-white/40",
          "dark:border-white/20",
          "text-base-content",
        ],
        bordered: ["bg-white", "dark:bg-gray-800", "border-2", "border-base-300", "text-base-content"],
        elevated: ["bg-white", "dark:bg-gray-800", "border-base-300", "text-base-content", "shadow-2xl"],
        flat: ["bg-white", "dark:bg-gray-800", "border-base-300", "text-base-content"],
        outlined: ["bg-white", "dark:bg-gray-800", "border-base-content/20", "text-base-content"],
        minimal: ["bg-white", "dark:bg-gray-800", "border-base-300", "text-base-content"],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Calendar container (inner panel) styles
 */
export const calendarContainerVariants = cva(["p-5", "w-[360px]"]);

/**
 * Calendar header styles
 */
export const calendarHeaderVariants = cva([
  "flex",
  "items-center",
  "justify-between",
  "mb-3",
]);

/**
 * Calendar header button styles
 */
export const calendarHeaderButtonVariants = cva([
  "text-[15px]",
  "font-semibold",
  "hover:bg-base-200",
  "px-3",
  "py-1",
  "rounded-md",
  "transition-colors",
  "tracking-tight",
]);

/**
 * Calendar navigation button styles
 */
export const calendarNavButtonVariants = cva([
  "p-1.5",
  "hover:bg-base-200",
  "rounded-md",
  "transition-colors",
]);

/**
 * Week day label styles
 */
export const weekDayLabelVariants = cva([
  "text-center",
  "text-[11px]",
  "font-semibold",
  "text-base-content/50",
  "py-1.5",
  "uppercase",
  "tracking-wide",
]);

/**
 * Day cell base styles
 */
export const dayCellVariants = cva(
  [
    "flex",
    "items-center",
    "justify-center",
    "w-[40px]",
    "h-[40px]",
    "rounded-md",
    "transition-colors",
    "text-[13px]",
    "font-medium",
  ],
  {
    variants: {
      state: {
        default: ["cursor-pointer"],
        disabled: ["text-base-content/25", "cursor-not-allowed", "line-through"],
        empty: [],
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
);

/**
 * Day cell color variants based on selection state
 */
export const dayCellColorVariants = cva([], {
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
    },
    state: {
      default: [],
      selected: ["font-semibold"],
      rangeStart: ["font-semibold", "rounded-r-none"],
      rangeEnd: ["font-semibold", "rounded-l-none"],
      inRange: ["rounded-none"],
      today: ["font-semibold"],
      hover: [],
    },
  },
  compoundVariants: [
    // Default variant
    { variant: "default", state: "selected", class: "bg-primary text-primary-foreground" },
    { variant: "default", state: "rangeStart", class: "bg-primary text-primary-foreground" },
    { variant: "default", state: "rangeEnd", class: "bg-primary text-primary-foreground" },
    { variant: "default", state: "inRange", class: "bg-primary/15 text-primary" },
    { variant: "default", state: "today", class: "ring-1 ring-primary text-primary" },
    { variant: "default", state: "hover", class: "hover:bg-base-200" },
    { variant: "default", state: "default", class: "hover:bg-base-200" },

    // Primary variant
    { variant: "primary", state: "selected", class: "bg-primary text-primary-foreground" },
    { variant: "primary", state: "rangeStart", class: "bg-primary text-primary-foreground" },
    { variant: "primary", state: "rangeEnd", class: "bg-primary text-primary-foreground" },
    { variant: "primary", state: "inRange", class: "bg-primary/15 text-primary" },
    { variant: "primary", state: "today", class: "ring-1 ring-primary text-primary" },
    { variant: "primary", state: "hover", class: "hover:bg-primary/10" },
    { variant: "primary", state: "default", class: "hover:bg-primary/10" },

    // Secondary variant
    { variant: "secondary", state: "selected", class: "bg-secondary text-secondary-foreground" },
    { variant: "secondary", state: "rangeStart", class: "bg-secondary text-secondary-foreground" },
    { variant: "secondary", state: "rangeEnd", class: "bg-secondary text-secondary-foreground" },
    { variant: "secondary", state: "inRange", class: "bg-secondary/15 text-secondary" },
    { variant: "secondary", state: "today", class: "ring-1 ring-secondary text-secondary" },
    { variant: "secondary", state: "hover", class: "hover:bg-secondary/10" },
    { variant: "secondary", state: "default", class: "hover:bg-secondary/10" },

    // Accent variant
    { variant: "accent", state: "selected", class: "bg-accent text-accent-foreground" },
    { variant: "accent", state: "rangeStart", class: "bg-accent text-accent-foreground" },
    { variant: "accent", state: "rangeEnd", class: "bg-accent text-accent-foreground" },
    { variant: "accent", state: "inRange", class: "bg-accent/15 text-accent" },
    { variant: "accent", state: "today", class: "ring-1 ring-accent text-accent" },
    { variant: "accent", state: "hover", class: "hover:bg-accent/10" },
    { variant: "accent", state: "default", class: "hover:bg-accent/10" },

    // Success variant
    { variant: "success", state: "selected", class: "bg-success text-white" },
    { variant: "success", state: "rangeStart", class: "bg-success text-white" },
    { variant: "success", state: "rangeEnd", class: "bg-success text-white" },
    { variant: "success", state: "inRange", class: "bg-success/15 text-success" },
    { variant: "success", state: "today", class: "ring-1 ring-success text-success" },
    { variant: "success", state: "hover", class: "hover:bg-success/10" },
    { variant: "success", state: "default", class: "hover:bg-success/10" },

    // Warning variant
    { variant: "warning", state: "selected", class: "bg-warning text-white" },
    { variant: "warning", state: "rangeStart", class: "bg-warning text-white" },
    { variant: "warning", state: "rangeEnd", class: "bg-warning text-white" },
    { variant: "warning", state: "inRange", class: "bg-warning/15 text-warning" },
    { variant: "warning", state: "today", class: "ring-1 ring-warning text-warning" },
    { variant: "warning", state: "hover", class: "hover:bg-warning/10" },
    { variant: "warning", state: "default", class: "hover:bg-warning/10" },

    // Danger variant
    { variant: "danger", state: "selected", class: "bg-destructive text-white" },
    { variant: "danger", state: "rangeStart", class: "bg-destructive text-white" },
    { variant: "danger", state: "rangeEnd", class: "bg-destructive text-white" },
    { variant: "danger", state: "inRange", class: "bg-destructive/15 text-destructive" },
    { variant: "danger", state: "today", class: "ring-1 ring-destructive text-destructive" },
    { variant: "danger", state: "hover", class: "hover:bg-destructive/10" },
    { variant: "danger", state: "default", class: "hover:bg-destructive/10" },

    // Info variant
    { variant: "info", state: "selected", class: "bg-info text-white" },
    { variant: "info", state: "rangeStart", class: "bg-info text-white" },
    { variant: "info", state: "rangeEnd", class: "bg-info text-white" },
    { variant: "info", state: "inRange", class: "bg-info/15 text-info" },
    { variant: "info", state: "today", class: "ring-1 ring-info text-info" },
    { variant: "info", state: "hover", class: "hover:bg-info/10" },
    { variant: "info", state: "default", class: "hover:bg-info/10" },

    // Glass variant
    { variant: "glass", state: "selected", class: "bg-primary text-primary-foreground" },
    { variant: "glass", state: "rangeStart", class: "bg-primary text-primary-foreground" },
    { variant: "glass", state: "rangeEnd", class: "bg-primary text-primary-foreground" },
    { variant: "glass", state: "inRange", class: "bg-primary/15 text-primary" },
    { variant: "glass", state: "today", class: "ring-1 ring-primary text-primary" },
    { variant: "glass", state: "hover", class: "hover:bg-white/10 dark:hover:bg-gray-900/10" },
    { variant: "glass", state: "default", class: "hover:bg-white/10 dark:hover:bg-gray-900/10" },

    // Bordered variant
    { variant: "bordered", state: "selected", class: "bg-primary text-primary-foreground" },
    { variant: "bordered", state: "rangeStart", class: "bg-primary text-primary-foreground" },
    { variant: "bordered", state: "rangeEnd", class: "bg-primary text-primary-foreground" },
    { variant: "bordered", state: "inRange", class: "bg-primary/15 text-primary" },
    { variant: "bordered", state: "today", class: "ring-1 ring-primary text-primary" },
    { variant: "bordered", state: "hover", class: "hover:bg-base-200" },
    { variant: "bordered", state: "default", class: "hover:bg-base-200" },

    // Elevated variant
    { variant: "elevated", state: "selected", class: "bg-primary text-primary-foreground" },
    { variant: "elevated", state: "rangeStart", class: "bg-primary text-primary-foreground" },
    { variant: "elevated", state: "rangeEnd", class: "bg-primary text-primary-foreground" },
    { variant: "elevated", state: "inRange", class: "bg-primary/15 text-primary" },
    { variant: "elevated", state: "today", class: "ring-1 ring-primary text-primary" },
    { variant: "elevated", state: "hover", class: "hover:bg-base-200" },
    { variant: "elevated", state: "default", class: "hover:bg-base-200" },

    // Flat variant
    { variant: "flat", state: "selected", class: "bg-primary text-primary-foreground" },
    { variant: "flat", state: "rangeStart", class: "bg-primary text-primary-foreground" },
    { variant: "flat", state: "rangeEnd", class: "bg-primary text-primary-foreground" },
    { variant: "flat", state: "inRange", class: "bg-primary/15 text-primary" },
    { variant: "flat", state: "today", class: "ring-1 ring-primary text-primary" },
    { variant: "flat", state: "hover", class: "hover:bg-base-200" },
    { variant: "flat", state: "default", class: "hover:bg-base-200" },

    // Outlined variant
    { variant: "outlined", state: "selected", class: "bg-base-content text-base-100" },
    { variant: "outlined", state: "rangeStart", class: "bg-base-content text-base-100" },
    { variant: "outlined", state: "rangeEnd", class: "bg-base-content text-base-100" },
    { variant: "outlined", state: "inRange", class: "bg-base-content/15 text-base-content" },
    { variant: "outlined", state: "today", class: "ring-1 ring-base-content text-base-content" },
    { variant: "outlined", state: "hover", class: "hover:bg-base-200" },
    { variant: "outlined", state: "default", class: "hover:bg-base-200" },

    // Minimal variant
    { variant: "minimal", state: "selected", class: "bg-primary text-primary-foreground" },
    { variant: "minimal", state: "rangeStart", class: "bg-primary text-primary-foreground" },
    { variant: "minimal", state: "rangeEnd", class: "bg-primary text-primary-foreground" },
    { variant: "minimal", state: "inRange", class: "bg-primary/15 text-primary" },
    { variant: "minimal", state: "today", class: "ring-1 ring-primary text-primary" },
    { variant: "minimal", state: "hover", class: "hover:bg-base-200" },
    { variant: "minimal", state: "default", class: "hover:bg-base-200" },
  ],
  defaultVariants: {
    variant: "default",
    state: "default",
  },
});

/**
 * Month/Year cell base styles
 */
export const monthYearCellVariants = cva(
  [
    "flex",
    "items-center",
    "justify-center",
    "rounded-md",
    "transition-colors",
    "text-[13px]",
    "font-medium",
    "cursor-pointer",
    "h-full",
  ],
  {
    variants: {
      state: {
        default: [],
        disabled: ["text-base-content/25", "cursor-not-allowed", "opacity-50"],
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
);

/**
 * Month/Year cell color variants
 */
export const monthYearCellColorVariants = cva([], {
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
    },
    state: {
      default: [],
      selected: ["font-semibold"],
      current: [],
    },
  },
  compoundVariants: [
    // Default
    { variant: "default", state: "selected", class: "bg-primary text-primary-foreground" },
    { variant: "default", state: "current", class: "ring-1 ring-primary text-primary hover:bg-primary/10" },
    { variant: "default", state: "default", class: "hover:bg-base-200" },

    // Primary
    { variant: "primary", state: "selected", class: "bg-primary text-primary-foreground" },
    { variant: "primary", state: "current", class: "ring-1 ring-primary text-primary hover:bg-primary/10" },
    { variant: "primary", state: "default", class: "hover:bg-primary/10" },

    // Secondary
    { variant: "secondary", state: "selected", class: "bg-secondary text-secondary-foreground" },
    { variant: "secondary", state: "current", class: "ring-1 ring-secondary text-secondary hover:bg-secondary/10" },
    { variant: "secondary", state: "default", class: "hover:bg-secondary/10" },

    // Accent
    { variant: "accent", state: "selected", class: "bg-accent text-accent-foreground" },
    { variant: "accent", state: "current", class: "ring-1 ring-accent text-accent hover:bg-accent/10" },
    { variant: "accent", state: "default", class: "hover:bg-accent/10" },

    // Success
    { variant: "success", state: "selected", class: "bg-success text-white" },
    { variant: "success", state: "current", class: "ring-1 ring-success text-success hover:bg-success/10" },
    { variant: "success", state: "default", class: "hover:bg-success/10" },

    // Warning
    { variant: "warning", state: "selected", class: "bg-warning text-white" },
    { variant: "warning", state: "current", class: "ring-1 ring-warning text-warning hover:bg-warning/10" },
    { variant: "warning", state: "default", class: "hover:bg-warning/10" },

    // Danger
    { variant: "danger", state: "selected", class: "bg-destructive text-white" },
    { variant: "danger", state: "current", class: "ring-1 ring-destructive text-destructive hover:bg-destructive/10" },
    { variant: "danger", state: "default", class: "hover:bg-destructive/10" },

    // Info
    { variant: "info", state: "selected", class: "bg-info text-white" },
    { variant: "info", state: "current", class: "ring-1 ring-info text-info hover:bg-info/10" },
    { variant: "info", state: "default", class: "hover:bg-info/10" },

    // Glass
    { variant: "glass", state: "selected", class: "bg-primary text-primary-foreground" },
    { variant: "glass", state: "current", class: "ring-1 ring-primary text-primary hover:bg-white/10" },
    { variant: "glass", state: "default", class: "hover:bg-white/10 dark:hover:bg-gray-900/10" },

    // Bordered
    { variant: "bordered", state: "selected", class: "bg-primary text-primary-foreground" },
    { variant: "bordered", state: "current", class: "ring-1 ring-primary text-primary hover:bg-primary/10" },
    { variant: "bordered", state: "default", class: "hover:bg-base-200" },

    // Elevated
    { variant: "elevated", state: "selected", class: "bg-primary text-primary-foreground" },
    { variant: "elevated", state: "current", class: "ring-1 ring-primary text-primary hover:bg-primary/10" },
    { variant: "elevated", state: "default", class: "hover:bg-base-200" },

    // Flat
    { variant: "flat", state: "selected", class: "bg-primary text-primary-foreground" },
    { variant: "flat", state: "current", class: "ring-1 ring-primary text-primary hover:bg-primary/10" },
    { variant: "flat", state: "default", class: "hover:bg-base-200" },

    // Outlined
    { variant: "outlined", state: "selected", class: "bg-base-content text-base-100" },
    { variant: "outlined", state: "current", class: "ring-1 ring-base-content text-base-content hover:bg-base-content/10" },
    { variant: "outlined", state: "default", class: "hover:bg-base-200" },

    // Minimal
    { variant: "minimal", state: "selected", class: "bg-primary text-primary-foreground" },
    { variant: "minimal", state: "current", class: "ring-1 ring-primary text-primary hover:bg-primary/10" },
    { variant: "minimal", state: "default", class: "hover:bg-base-200" },
  ],
  defaultVariants: {
    variant: "default",
    state: "default",
  },
});

/**
 * Grid content height for months/years view
 */
export const gridContentHeightClass = "h-[228px]";

/**
 * Shortcuts sidebar styles
 */
export const shortcutsSidebarVariants = cva(["border-r", "py-3", "px-2", "min-w-[130px]"], {
  variants: {
    variant: {
      default: ["border-base-200"],
      primary: ["border-primary/15"],
      secondary: ["border-secondary/15"],
      accent: ["border-accent/15"],
      success: ["border-success/15"],
      warning: ["border-warning/15"],
      danger: ["border-destructive/15"],
      info: ["border-info/15"],
      glass: ["border-white/30", "dark:border-white/15"],
      bordered: ["border-base-200"],
      elevated: ["border-base-200"],
      flat: ["border-base-200"],
      outlined: ["border-base-content/15"],
      minimal: ["border-base-200"],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/**
 * Shortcut button styles
 */
export const shortcutButtonVariants = cva(
  ["text-left", "px-2.5", "py-1.5", "rounded-md", "text-[13px]", "font-medium", "transition-colors"],
  {
    variants: {
      variant: {
        default: ["hover:bg-base-200"],
        primary: ["hover:bg-primary/10", "hover:text-primary"],
        secondary: ["hover:bg-secondary/10", "hover:text-secondary"],
        accent: ["hover:bg-accent/10", "hover:text-accent"],
        success: ["hover:bg-success/10", "hover:text-success"],
        warning: ["hover:bg-warning/10", "hover:text-warning"],
        danger: ["hover:bg-destructive/10", "hover:text-destructive"],
        info: ["hover:bg-info/10", "hover:text-info"],
        glass: ["hover:bg-white/10", "dark:hover:bg-gray-900/10"],
        bordered: ["hover:bg-base-200"],
        elevated: ["hover:bg-base-200"],
        flat: ["hover:bg-base-200"],
        outlined: ["hover:bg-base-200"],
        minimal: ["hover:bg-base-200"],
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
export const footerVariants = cva(["border-t", "px-3", "py-2.5", "flex", "items-center", "justify-end", "gap-2"], {
  variants: {
    variant: {
      default: ["border-base-200"],
      primary: ["border-primary/15"],
      secondary: ["border-secondary/15"],
      accent: ["border-accent/15"],
      success: ["border-success/15"],
      warning: ["border-warning/15"],
      danger: ["border-destructive/15"],
      info: ["border-info/15"],
      glass: ["border-white/30", "dark:border-white/15"],
      bordered: ["border-base-200"],
      elevated: ["border-base-200"],
      flat: ["border-base-200"],
      outlined: ["border-base-content/15"],
      minimal: ["border-base-200"],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/**
 * Footer cancel button styles
 */
export const footerCancelButtonVariants = cva(
  ["px-3", "py-1.5", "text-[13px]", "font-medium", "border", "rounded-md", "transition-colors"],
  {
    variants: {
      variant: {
        default: ["border-base-300", "hover:bg-base-100"],
        primary: ["border-primary/20", "hover:bg-primary/10"],
        secondary: ["border-secondary/20", "hover:bg-secondary/10"],
        accent: ["border-accent/20", "hover:bg-accent/10"],
        success: ["border-success/20", "hover:bg-success/10"],
        warning: ["border-warning/20", "hover:bg-warning/10"],
        danger: ["border-destructive/20", "hover:bg-destructive/10"],
        info: ["border-info/20", "hover:bg-info/10"],
        glass: ["border-white/30", "hover:bg-white/10"],
        bordered: ["border-base-300", "hover:bg-base-100"],
        elevated: ["border-base-300", "hover:bg-base-100"],
        flat: ["border-base-300", "hover:bg-base-100"],
        outlined: ["border-base-content/20", "hover:bg-base-100"],
        minimal: ["border-base-300", "hover:bg-base-100"],
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
  ["px-3", "py-1.5", "text-[13px]", "font-medium", "text-white", "rounded-md", "transition-colors"],
  {
    variants: {
      variant: {
        default: ["bg-primary", "hover:bg-primary/90"],
        primary: ["bg-primary", "hover:bg-primary/90"],
        secondary: ["bg-secondary", "hover:bg-secondary/90"],
        accent: ["bg-accent", "hover:bg-accent/90"],
        success: ["bg-success", "hover:bg-success/90"],
        warning: ["bg-warning", "hover:bg-warning/90"],
        danger: ["bg-destructive", "hover:bg-destructive/90"],
        info: ["bg-info", "hover:bg-info/90"],
        glass: ["bg-primary", "hover:bg-primary/90"],
        bordered: ["bg-primary", "hover:bg-primary/90"],
        elevated: ["bg-primary", "hover:bg-primary/90"],
        flat: ["bg-primary", "hover:bg-primary/90"],
        outlined: ["bg-base-content", "hover:bg-base-content/90"],
        minimal: ["bg-primary", "hover:bg-primary/90"],
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
export const arrowVariants = cva(["absolute", "h-4", "w-4", "rotate-45", "border-l", "border-t"], {
  variants: {
    variant: {
      default: ["bg-white", "dark:bg-gray-800", "border-base-300"],
      primary: ["bg-white", "dark:bg-gray-800", "border-primary/20"],
      secondary: ["bg-white", "dark:bg-gray-800", "border-secondary/20"],
      accent: ["bg-white", "dark:bg-gray-800", "border-accent/20"],
      success: ["bg-white", "dark:bg-gray-800", "border-success/20"],
      warning: ["bg-white", "dark:bg-gray-800", "border-warning/20"],
      danger: ["bg-white", "dark:bg-gray-800", "border-destructive/20"],
      info: ["bg-white", "dark:bg-gray-800", "border-info/20"],
      glass: ["border-white/40", "dark:border-white/20", "backdrop-blur-xl", "bg-white/30", "dark:bg-gray-900/40"],
      bordered: ["border-2", "bg-white", "dark:bg-gray-800", "border-base-300"],
      elevated: ["bg-white", "dark:bg-gray-800", "border-base-300"],
      flat: ["bg-white", "dark:bg-gray-800", "border-base-300"],
      outlined: ["bg-white", "dark:bg-gray-800", "border-base-content/20"],
      minimal: ["bg-white", "dark:bg-gray-800", "border-base-300"],
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
});

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