import { cva } from "class-variance-authority";

export const themeToggleButtonVariants = cva(
  "glass glass-hover rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg hover:shadow-2xl relative before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-white/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:pointer-events-none group",
  {
    variants: {
      variant: {
        icon: "p-3",
        "icon-label": "px-4 py-3 flex items-center gap-2",
      },
    },
    defaultVariants: {
      variant: "icon",
    },
  }
);

export const themeToggleIconVariants = cva(
  "transition-transform group-hover:rotate-12",
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

export const themeDropdownVariants = cva(
  "absolute right-0 mt-2 glass rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200",
  {
    variants: {
      variant: {
        icon: "w-40",
        "icon-label": "w-44",
      },
    },
    defaultVariants: {
      variant: "icon",
    },
  }
);

export const themeOptionVariants = cva(
  "w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 hover:bg-white/10",
  {
    variants: {
      selected: {
        true: "bg-primary/20 text-primary",
        false: "text-foreground",
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
);
