import { cva } from "class-variance-authority";

// ============================================================================
// Main AppBar Container
// ============================================================================
export const appBarVariants = cva(
  [
    "w-full",
    "flex",
    "flex-col",
    "isolate",
    // Smooth transitions for all properties
    "transition-[transform,opacity,background-color,box-shadow,backdrop-filter]",
    "duration-300",
    "ease-[cubic-bezier(0.4,0,0.2,1)]",
  ],
  {
    variants: {
      position: {
        static: "relative",
        fixed: "fixed top-0 left-0 right-0",
        sticky: "sticky top-0",
        absolute: "absolute top-0 left-0 right-0",
      },
      variant: {
        default: [
          "bg-background/95",
          "border-b",
          "border-border/40",
          "supports-[backdrop-filter]:bg-background/60",
          "supports-[backdrop-filter]:backdrop-blur-xl",
          "supports-[backdrop-filter]:backdrop-saturate-150",
        ],
        elevated: [
          "bg-background",
          "shadow-[0_1px_3px_0_rgb(0_0_0/0.05),0_1px_2px_-1px_rgb(0_0_0/0.05)]",
          "dark:shadow-[0_1px_3px_0_rgb(0_0_0/0.2),0_1px_2px_-1px_rgb(0_0_0/0.2)]",
        ],
        outlined: ["bg-background", "border-b-2", "border-border/60"],
        transparent: ["bg-transparent"],
        glass: [
          "bg-white/70",
          "dark:bg-gray-900/70",
          "backdrop-blur-2xl",
          "backdrop-saturate-[1.8]",
          "border-b",
          "border-white/20",
          "dark:border-white/10",
          "shadow-[0_4px_30px_rgb(0_0_0/0.05)]",
          "dark:shadow-[0_4px_30px_rgb(0_0_0/0.3)]",
        ],
        floating: [
          "mx-4",
          "mt-4",
          "rounded-2xl",
          "bg-white/80",
          "dark:bg-gray-900/80",
          "backdrop-blur-2xl",
          "backdrop-saturate-[1.8]",
          "border",
          "border-white/30",
          "dark:border-white/10",
          "shadow-[0_8px_32px_rgb(0_0_0/0.08),0_2px_8px_rgb(0_0_0/0.04)]",
          "dark:shadow-[0_8px_32px_rgb(0_0_0/0.4),0_2px_8px_rgb(0_0_0/0.2)]",
        ],
      },
      color: {
        default: "",
        primary: "",
        secondary: "",
        transparent: "bg-transparent",
        inherit: "",
      },
      elevation: {
        0: "shadow-none",
        1: "shadow-sm shadow-black/[0.03] dark:shadow-black/20",
        2: "shadow-[0_4px_12px_rgb(0_0_0/0.05)] dark:shadow-[0_4px_12px_rgb(0_0_0/0.3)]",
        3: "shadow-[0_8px_24px_rgb(0_0_0/0.08)] dark:shadow-[0_8px_24px_rgb(0_0_0/0.4)]",
        4: "shadow-[0_12px_40px_rgb(0_0_0/0.12)] dark:shadow-[0_12px_40px_rgb(0_0_0/0.5)]",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
      },
      blur: {
        true: ["backdrop-blur-xl", "backdrop-saturate-150"],
        false: "",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
      shrunk: {
        true: "",
        false: "",
      },
      secondary: {
        true: "border-t-0",
        false: "",
      },
      safeArea: {
        true: "pt-[env(safe-area-inset-top)]",
        false: "",
      },
      hideOnPrint: {
        true: "print:hidden",
        false: "",
      },
    },
    compoundVariants: [
      // Primary color variants
      {
        color: "primary",
        variant: "default",
        className: [
          "bg-primary/95",
          "supports-[backdrop-filter]:bg-primary/85",
          "text-primary-foreground",
          "border-primary/20",
        ],
      },
      {
        color: "primary",
        variant: "elevated",
        className: [
          "bg-gradient-to-r",
          "from-primary",
          "to-primary/90",
          "text-primary-foreground",
          "shadow-[0_4px_20px_-2px] shadow-primary/30",
        ],
      },
      {
        color: "primary",
        variant: "glass",
        className: [
          "bg-primary/80",
          "dark:bg-primary/70",
          "text-primary-foreground",
          "border-primary-foreground/10",
        ],
      },
      {
        color: "primary",
        variant: "floating",
        className: [
          "bg-primary/90",
          "dark:bg-primary/80",
          "text-primary-foreground",
          "border-primary-foreground/10",
          "shadow-primary/25",
        ],
      },
      // Secondary color variants
      {
        color: "secondary",
        variant: "default",
        className: [
          "bg-secondary/95",
          "text-secondary-foreground",
          "border-secondary/20",
        ],
      },
      {
        color: "secondary",
        variant: "elevated",
        className: [
          "bg-gradient-to-r",
          "from-secondary",
          "to-secondary/90",
          "text-secondary-foreground",
        ],
      },
      // Transparent with blur
      {
        variant: "transparent",
        blur: true,
        className: [
          "bg-background/40",
          "dark:bg-background/30",
          "backdrop-blur-2xl",
          "backdrop-saturate-150",
        ],
      },
    ],
    defaultVariants: {
      position: "static",
      variant: "default",
      color: "default",
      elevation: 0,
      size: "md",
      blur: false,
      fullWidth: true,
      shrunk: false,
      secondary: false,
      safeArea: false,
      hideOnPrint: true,
    },
  }
);

// ============================================================================
// Inner Container (controls height and padding)
// ============================================================================
export const appBarInnerVariants = cva(
  [
    "flex",
    "items-center",
    "w-full",
    "transition-all",
    "duration-300",
    "ease-[cubic-bezier(0.4,0,0.2,1)]",
  ],
  {
    variants: {
      size: {
        sm: "h-12 px-3 gap-2 sm:px-4",
        md: "h-14 px-4 gap-3 sm:h-16 sm:px-6",
        lg: "h-16 px-4 gap-4 sm:h-20 sm:px-8",
      },
      shrunk: {
        true: "",
        false: "",
      },
      centered: {
        true: "justify-center",
        false: "justify-between",
      },
    },
    compoundVariants: [
      {
        size: "lg",
        shrunk: true,
        className: "h-12 sm:h-14",
      },
      {
        size: "md",
        shrunk: true,
        className: "h-11 sm:h-12",
      },
    ],
    defaultVariants: {
      size: "md",
      shrunk: false,
      centered: false,
    },
  }
);

// ============================================================================
// Content Container (max-width and centering)
// ============================================================================
export const appBarContentVariants = cva(
  ["flex", "items-center", "w-full", "h-full", "mx-auto"],
  {
    variants: {
      maxWidth: {
        sm: "max-w-screen-sm",
        md: "max-w-screen-md",
        lg: "max-w-screen-lg",
        xl: "max-w-screen-xl",
        "2xl": "max-w-screen-2xl",
        full: "max-w-full",
      },
      hasSlots: {
        true: "justify-between",
        false: "",
      },
    },
    defaultVariants: {
      maxWidth: "full",
      hasSlots: false,
    },
  }
);

// ============================================================================
// Hide/Show Animation
// ============================================================================
export const appBarScrollVariants = cva(
  ["transition-all", "duration-500", "ease-[cubic-bezier(0.32,0.72,0,1)]"],
  {
    variants: {
      hidden: {
        true: "-translate-y-full opacity-0 pointer-events-none",
        false: "translate-y-0 opacity-100",
      },
      animation: {
        none: "transition-none",
        fade: "transition-opacity duration-400",
        slide: "transition-transform duration-500",
        scale: "transition-all duration-400",
      },
    },
    compoundVariants: [
      {
        hidden: true,
        animation: "scale",
        className: "-translate-y-full scale-[0.98] opacity-0",
      },
      {
        hidden: true,
        animation: "fade",
        className: "opacity-0",
      },
    ],
    defaultVariants: {
      hidden: false,
      animation: "slide",
    },
  }
);

// ============================================================================
// Slot Containers
// ============================================================================
export const appBarSlotVariants = cva(
  ["flex", "items-center", "shrink-0", "transition-all", "duration-300"],
  {
    variants: {
      position: {
        start: "justify-start gap-1 sm:gap-2",
        center: "justify-center flex-1 min-w-0 px-2 sm:px-4",
        end: "justify-end gap-1 sm:gap-2",
      },
    },
    defaultVariants: {
      position: "start",
    },
  }
);

// ============================================================================
// Progress Bar
// ============================================================================
export const appBarProgressVariants = cva(
  ["absolute", "left-0", "right-0", "overflow-hidden", "z-10"],
  {
    variants: {
      position: {
        top: "top-0",
        bottom: "bottom-0",
      },
    },
    defaultVariants: {
      position: "bottom",
    },
  }
);

// ============================================================================
// Announcement Banner
// ============================================================================
export const appBarAnnouncementVariants = cva(
  [
    "w-full",
    "py-2.5",
    "px-4",
    "text-center",
    "text-sm",
    "font-medium",
    "flex",
    "items-center",
    "justify-center",
    "gap-2",
    "relative",
    // Animation
    "animate-in",
    "fade-in",
    "slide-in-from-top-2",
    "duration-500",
  ],
  {
    variants: {
      dismissible: {
        true: "pr-10",
        false: "",
      },
    },
    defaultVariants: {
      dismissible: true,
    },
  }
);

// ============================================================================
// Search Container
// ============================================================================
export const appBarSearchVariants = cva(
  [
    "flex",
    "items-center",
    "overflow-hidden",
    // Smooth transition
    "transition-all",
    "duration-400",
    "ease-[cubic-bezier(0.4,0,0.2,1)]",
  ],
  {
    variants: {
      expanded: {
        true: [
          "w-full",
          "max-w-md",
          "bg-muted/60",
          "dark:bg-muted/40",
          "rounded-full",
          "px-1",
          "ring-1",
          "ring-border/50",
          "focus-within:ring-2",
          "focus-within:ring-primary/30",
          "focus-within:bg-muted/80",
        ],
        false: "w-auto",
      },
    },
    defaultVariants: {
      expanded: false,
    },
  }
);

// ============================================================================
// Title
// ============================================================================
export const appBarTitleVariants = cva(
  [
    "font-semibold",
    "leading-tight",
    "transition-all",
    "duration-300",
    "bg-clip-text",
  ],
  {
    variants: {
      size: {
        sm: "text-base sm:text-lg",
        md: "text-lg sm:text-xl",
        lg: "text-xl sm:text-2xl",
      },
      truncate: {
        true: "truncate max-w-[180px] sm:max-w-xs md:max-w-sm lg:max-w-md",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      truncate: true,
    },
  }
);

// ============================================================================
// Skip to Content
// ============================================================================
export const skipToContentVariants = cva([
  "sr-only",
  "focus:not-sr-only",
  "focus:absolute",
  "focus:z-[9999]",
  "focus:top-4",
  "focus:left-4",
  "focus:px-6",
  "focus:py-3",
  "focus:bg-primary",
  "focus:text-primary-foreground",
  "focus:rounded-xl",
  "focus:font-medium",
  "focus:outline-none",
  "focus:ring-2",
  "focus:ring-ring",
  "focus:ring-offset-2",
  "focus:shadow-lg",
  "transition-all",
  "duration-200",
]);

// ============================================================================
// Entrance Animations
// ============================================================================
export const appBarEntranceVariants = cva("", {
  variants: {
    entrance: {
      none: "",
      slideDown: [
        "animate-in",
        "slide-in-from-top-full",
        "fade-in",
        "duration-700",
        "ease-out",
        "fill-mode-both",
      ],
      fadeIn: [
        "animate-in",
        "fade-in",
        "duration-500",
        "ease-out",
        "fill-mode-both",
      ],
      slideUp: [
        "animate-in",
        "slide-in-from-bottom-4",
        "fade-in",
        "duration-500",
        "ease-out",
        "fill-mode-both",
      ],
      scale: [
        "animate-in",
        "zoom-in-95",
        "fade-in",
        "duration-400",
        "ease-out",
        "fill-mode-both",
      ],
    },
  },
  defaultVariants: {
    entrance: "none",
  },
});

// ============================================================================
// Secondary Row (breadcrumbs, tabs)
// ============================================================================
export const appBarSecondaryRowVariants = cva(
  [
    "flex",
    "items-center",
    "w-full",
    "border-t",
    "border-border/30",
    "bg-muted/20",
    "transition-all",
    "duration-300",
  ],
  {
    variants: {
      size: {
        sm: "px-3 py-1.5 gap-2 sm:px-4",
        md: "px-4 py-2 gap-3 sm:px-6",
        lg: "px-4 py-2.5 gap-4 sm:px-8",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ============================================================================
// Action Button Base
// ============================================================================
export const appBarActionVariants = cva(
  [
    "relative",
    "inline-flex",
    "items-center",
    "justify-center",
    "rounded-full",
    "transition-all",
    "duration-200",
    "ease-out",
    // Focus styles
    "focus:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-ring",
    "focus-visible:ring-offset-2",
    // Hover/Active
    "hover:bg-accent/80",
    "hover:scale-105",
    "active:scale-95",
    "active:bg-accent",
  ],
  {
    variants: {
      size: {
        sm: "p-1.5",
        md: "p-2",
        lg: "p-2.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ============================================================================
// Badge
// ============================================================================
export const appBarBadgeVariants = cva([
  "absolute",
  "-top-0.5",
  "-right-0.5",
  "min-w-[18px]",
  "h-[18px]",
  "flex",
  "items-center",
  "justify-center",
  "bg-destructive",
  "text-destructive-foreground",
  "text-[10px]",
  "font-semibold",
  "rounded-full",
  "px-1",
  "ring-2",
  "ring-background",
  // Animation
  "animate-in",
  "zoom-in-50",
  "fade-in",
  "duration-300",
]);
