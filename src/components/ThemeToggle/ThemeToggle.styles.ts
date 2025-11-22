import { cva } from "class-variance-authority";

export const themeToggleButtonVariants = cva(
  [
    "relative group inline-flex items-center justify-center",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "transition-transform duration-200",
    // subtle glass overlay helper (rounded handled per-variant)
    "before:absolute before:inset-0 before:bg-gradient-to-br",
    "before:from-white before:via-transparent before:to-white/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        icon: "rounded-full p-2.5 shadow-md hover:shadow-lg hover:scale-105 before:rounded-full",
        "icon-label":
          "rounded-xl px-3 py-2 gap-2 shadow-lg hover:scale-102 border before:rounded-xl",
      },
      appearance: {
        default: "",
        glass:
          "backdrop-blur-md bg-white/10 dark:bg-black/10 border border-white/20 dark:border-black/20",
      },
    },
    defaultVariants: {
      variant: "icon",
      appearance: "default",
    },
  }
);

export const themeToggleIconVariants = cva("transition-colors", {
  variants: {
    theme: {
      light: "text-warning",
      dark: "text-primary",
      system: "text-info",
    },
    color: {
      primary: "text-primary",
      secondary: "text-secondary",
      success: "text-success",
      danger: "text-destructive",
      warning: "text-warning",
      info: "text-info",
      neutral: "text-foreground",
    },
  },
  defaultVariants: {
    theme: "light",
    color: "primary",
  },
});

export const themeToggleIconWrap = cva(
  "inline-flex items-center justify-center rounded-full",
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

export const themeDropdownVariants = cva(
  "absolute right-0 mt-2 rounded-xl shadow-2xl overflow-hidden z-[9999] animate-in fade-in slide-in-from-top-2 duration-200 bg-white dark:bg-black",
  {
    variants: {
      variant: {
        icon: "w-44",
        "icon-label": "w-52",
      },
      // control whether the dropdown uses entry animations
      animated: {
        on: "animate-in fade-in slide-in-from-top-2 duration-200",
        off: "animate-none",
      },
      menuBg: {
        // kept as variants but base already provides a sensible non-transparent default
        default: "bg-white dark:bg-black",
        white: "bg-white",
        primary: "bg-primary",
        neutral: "bg-foreground",
      },
      menuBorder: {
        default: "border-white dark:border-black",
        none: "border-0",
        primary: "border-primary",
        neutral: "border-muted",
      },
      menuColor: {
        default: "text-foreground",
        primary: "text-primary",
        neutral: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "icon",
      animated: "on",
      menuBg: "default",
      menuBorder: "default",
      menuColor: "default",
    },
  }
);

export const themeOptionVariants = cva(
  [
    "w-full flex items-center gap-3 px-4 py-3 transition-all duration-150",
    "hover:bg-gray-300 dark:hover:bg-zinc-900 cursor-pointer",
  ],
  {
    variants: {
      selected: {
        true: "bg-gradient-to-r from-primary/10 to-primary/5 text-primary",
        false: "text-foreground",
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
);

export const themeLabelVariants = cva("text-sm font-medium capitalize", {
  variants: {
    color: {
      primary: "text-primary",
      secondary: "text-secondary",
      success: "text-success",
      danger: "text-destructive",
      warning: "text-warning",
      info: "text-info",
      neutral: "text-foreground",
    },
  },
  defaultVariants: {
    color: "neutral",
  },
});
