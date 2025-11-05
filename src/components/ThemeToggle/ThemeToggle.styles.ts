import { cva } from "class-variance-authority";

export const themeToggleButtonVariants = cva(
  [
    // base
    "rounded-xl relative group inline-flex items-center justify-center",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "transition-transform duration-200",
    // glass effect
    "before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br",
    "before:from-white/20 before:via-transparent before:to-white/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        icon: "p-2.5 shadow-md hover:shadow-lg hover:scale-105",
        "icon-label": "px-3 py-2 gap-2 shadow-lg hover:scale-102",
      },
    },
    defaultVariants: {
      variant: "icon",
    },
  }
);

export const themeToggleIconVariants = cva(
  "transition-transform duration-300",
  {
    variants: {
      theme: {
        light: "text-warning",
        dark: "text-primary",
        system: "text-info",
      },
    },
    defaultVariants: {
      theme: "light",
    },
  }
);

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
  "absolute right-0 mt-2 glass rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200",
  {
    variants: {
      variant: {
        icon: "w-44",
        "icon-label": "w-52",
      },
    },
    defaultVariants: {
      variant: "icon",
    },
  }
);

export const themeOptionVariants = cva(
  [
    "w-full flex items-center gap-3 px-4 py-3 transition-all duration-150",
    "hover:bg-white/6",
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

export const themeLabelVariants = cva(
  "text-sm font-medium capitalize text-foreground"
);
